"use client"
import { useWixClient } from '@/hooks/useWixClient'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { members } from '@wix/members'
import Image from 'next/image'

interface WelcomeProps {
  
}

const Welcome: FC<WelcomeProps> = ({}) => {

    const wixClient = useWixClient();
    const router = useRouter()
    const [user, setUser] = useState({})
    const [isLoading, setIsloading] = useState(false)

    const returnedOAuthData = wixClient.auth.parseFromUrl()
    console.log(returnedOAuthData)
      
      /**
 * Asynchronously retrieves member tokens and sets the current user.
 * 
 * This function performs the following steps:
 * 1. Sets the loading state to true.
 * 2. Retrieves OAuth data from local storage.
 * 3. Uses the Wix client to get member tokens using the OAuth data.
 * 4. Stores the refresh token in cookies.
 * 5. Sets the retrieved tokens in the Wix client.
 * 6. Retrieves the current member's information.
 * 7. Updates the user state with the retrieved member information.
 * 8. Sets the loading state to false.
 * 
 * @returns {Promise<void>} A promise that resolves when the member tokens are retrieved and the user state is updated.
 */
const getMemberTokens = async (): Promise<void> => {
  try {
      setIsloading(true);
      
      // Retrieve OAuth data from local storage
      const oAuthData = JSON.parse(localStorage.getItem("oAuthRedirectData")!);
      
      // Get member tokens using the Wix client
      const memberTokens = await wixClient.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData,
      );
      
      // Store the refresh token in cookies
      Cookies.set("refreshToken", JSON.stringify(memberTokens.refreshToken), {
          expires: 2,
      });
      
      // Set the retrieved tokens in the Wix client
      wixClient.auth.setTokens(memberTokens);
      
      // Retrieve the current member's information
      const { member } = await wixClient.members.getCurrentMember({
          fieldsets: [members.Set.FULL],
      });
      
      // Log the member information to the console
      console.log(member);
      
      // Update the user state with the retrieved member information
      setUser((p) => member);
  } catch (error) {
      console.error("Error retrieving member tokens or setting user state:", error);
  } finally {
      // Set the loading state to false
      setIsloading(false);
  }
};

      
      useEffect(() => {
        getMemberTokens()


        // const timeout = setTimeout(() => {
        //   router.push("/")
        // }, 3 * 1000)

        // return () => clearTimeout(timeout)

      }, [])

     
     
     

      

  return <div className='w-full h-[80vh] flex justify-center items-center text-3xl'>
    
    { isLoading ? <WelcomeSkeleton /> :
      returnedOAuthData.error ? 
      <div className='flex flex-col gap-3'>
        <h1 className="text-red-400 text-5xl">ERROR!</h1>
        <span>{`Error: ${returnedOAuthData.errorDescription}`}</span>
        <Link href='/' className="text-blue-200 underline">Go to homepage</Link>
      </div> : user ? 
      <div className='flex flex-col  items-center justify-center gap-4'>
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <Image src={user.profile?.photo?.url || ''} alt='' width={80} height={80} className="object-contain" />
      </div>
      <h1 className="text-3xl text-center">Welcome</h1>
      <h1 className="text-5xl font-extrabold text-center">{user?.profile?.nickname}</h1>
      <span className="text-lg text-gray-500">You'll be redirected to the homepage in 3 seconds</span>
    </div>
    : null



    }
  </div>
}

export default Welcome



const WelcomeSkeleton = () => {
  return <div className='flex w-full flex-col items-center justify-center gap-4'>
  <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
  <div className="w-3/4 h-8 bg-gray-300 animate-pulse rounded"></div>
  <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded"></div>
</div>

}