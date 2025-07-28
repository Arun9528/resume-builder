"use client"
import { usePathname } from "next/navigation";

export default function GridWripper({children}:Readonly<{children:React.ReactNode}>){
    const pathname = usePathname();
    const isReviewPage = pathname.endsWith("/review");
    const mdCols = isReviewPage ? "grid-cols-1 lg:grid-cols-[13vw_1fr]" 
    : "md:grid-cols-[1fr_minmax(0,32vw)] lg:grid-cols-[13vw_1fr_minmax(0,25vw)]";
    return (
         <div className={`h-screen grid grid-cols-1 ${mdCols} overflow-x-hidden grid-rows-1`}>
            {children}
        </div>
    )

}