import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

const Layout = ( {children }: LayoutProps) => {
  return (
    <div className="w-full flex lg:justify-end">
        <div className="w-full lg:w-[84%] flex bg-white text-primary-black h-screen pt-8 lg:pt-12 overflow-y-auto">
            <div className="w-[95%] mx-auto">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout