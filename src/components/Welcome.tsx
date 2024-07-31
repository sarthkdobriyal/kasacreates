"use client"
import { useWixClient } from '@/hooks/useWixClient'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { members } from '@wix/members'

interface WelcomeProps {
  
}

const Welcome: FC<WelcomeProps> = ({}) => {

    const wixClient = useWixClient();
    const router = useRouter()

    const returnedOAuthData = wixClient.auth.parseFromUrl()
    
      
      const getMemberTokens = async () => {
          const oAuthData = JSON.parse(localStorage.getItem("oAuthRedirectData"))
          const memberTokens = await wixClient.auth.getMemberTokens(
              returnedOAuthData.code,
              returnedOAuthData.state,
              oAuthData,
            );
            Cookies.set("refreshToken", JSON.stringify(memberTokens.refreshToken), {
              expires: 2,
            });
            wixClient.auth.setTokens(memberTokens);
          
      }
      
      useEffect(() => {
        getMemberTokens()


        const timeout = setTimeout(() => {
          router.push("/")
        }, 3 * 1000)

        return () => clearTimeout(timeout)

      }, [])

      const getMember = async () => {
        const member = await wixClient.members.getCurrentMember('')
        console.log(member)
        return member
      }


      

  return <div className='w-full h-[80vh] flex justify-center items-center text-3xl'>
    
    {
      returnedOAuthData.error ? 
      <div className='flex flex-col gap-3'>
        <h1 className="text-red-400 text-5xl">ERROR!</h1>
        <span>{`Error: ${returnedOAuthData.errorDescription}`}</span>
        <Link href='/' className="text-blue-200 underline">Go to homepage</Link>
      </div> : <div className='flex flex-col gap-4'>
      <h1 className="text-5xl text-center">Welcome User</h1>
      <span className="text-xl text-gray-500">You'll be redirected to homepage in 3 seconds</span>
      </div>



    }
  </div>
}

export default Welcome