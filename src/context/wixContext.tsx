"use client"

import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { currentCart } from "@wix/ecom";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie"
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");


const myWixClient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      members
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID as string,
      tokens: {
        accessToken: {
          value: '',
          expiresAt: 0

        },
        refreshToken
      }
    })
  })

export type WixClient = typeof myWixClient

  export const WixClientContext = createContext<WixClient>(myWixClient)

  export const WixClientContextProvider = ({children}: {children: ReactNode}) => {
    return <WixClientContext.Provider value={myWixClient}>
        {children}
    </WixClientContext.Provider>
  }