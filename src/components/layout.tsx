import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
    noPadding?: boolean;
}

const Layout = ( {children, noPadding }: LayoutProps) => {
  return (
    <div className="w-full flex lg:justify-end">
        <div className={`w-full lg:w-[84%] flex bg-white text-primary-black h-screen 
        ${noPadding ? "" : "pt-8 lg:pt-12"} overflow-y-auto`}>
            <div className={`${noPadding ? "w-full" : "w-[95%] mx-auto"}`}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout