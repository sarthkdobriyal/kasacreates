"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import CartModal from "./CartModal";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import { members } from "@wix/members";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import { LogOut } from "lucide-react";

interface NavIconsProps {}

const NavIcons: FC<NavIconsProps> = ({}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});

  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  let isLoggedIn = wixClient.auth.loggedIn();

  const getUser = async () => {
    const member = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
    console.log(member.member);
    setUser(member.member);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
    if (isLoggedIn) getUser();
  }, [wixClient, getCart]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      // router.push("/login");
      login();
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const login = async () => {
    const loginRequestData = wixClient.auth.generateOAuthData(
      "http://localhost:3000/welcome"
    );

    // console.log(loginRequestData);
    localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
    window.location.href = authUrl;
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    localStorage.removeItem("oAuthRedirectData");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  return (
    <div className="flex items-center gap-6 xl:gap-4 relative">
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {
        isLoggedIn && user ? (
          <Image
        src={user.profile?.photo.url}
        alt=""
        width={42}
        height={42}
        className="cursor-pointer rounded-full ml-3"
        onClick={handleProfile}
      />

        ) : (
          <button onClick={handleProfile} className=" px-4 py-2 flex items-center justify-center gap-2">
            <Image
        src={user.profile?.photo.url || "/profile.png"}
        alt=""
        width={22}
        height={22}
        className="cursor-pointer rounded-full ml-3" />
        <span className="text-sm">LOGIN</span>

          </button>
        )
      }
      
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-16 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Link href="/profile" className="border-b border-gray-400 pb-2 w-full text-center text-base"> Edit Profile</Link>
          <div className="flex gap-1 items-center cursor-pointer border rounded-md border-gray-400 py-2 px-4 hover:bg-lama hover:text-white" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
            <LogOut size={16} />
          </div></div>
        </div>
      )}
      {/* <Image
    src="/notification.png"
    alt=""
    width={22}
    height={22}
    className="cursor-pointer"
  /> */}

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
