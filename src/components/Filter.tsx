"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";

interface FilterProps {
  catNames : collections.Collection[]
}

const Filter: FC<FilterProps> = ({catNames}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };




  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="cat"
          className="py-2 px-4 rounded-md text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          value={searchParams.get("cat") || ""}
        >
          {
            
              catNames?.map((cat) => {
                return <option  key={cat._id as string} value={cat.slug as string}>{cat.name}</option>
              })
            
          }
        </select>
        
        <div className="flex gap-4 h-8  ">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-md pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-md pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        </div>
        {/* TODO: Filter Categories */}
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-md text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
