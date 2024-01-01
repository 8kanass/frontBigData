'use client'

import { NextUIProvider } from "@nextui-org/react/dist"
export default function Providers({children}) {
    return(
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}