"use client"
import Previews from "../../components/preview";
import { useNavigation } from "@/hooks/useNavigation";
import FormNavigation from "../../components/formnavigation";
import DownloadPDFButton from "../../components/downlaodpdf";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Previewpanel from "../../components/previewpanel";
import { TemplateKey } from "../layout";

export default function Review(){
  const {prevPath,firstPart,nextPath} = useNavigation();
  const resumeRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const isReviewPage = path.includes('review')
    return (
       <div className="flex flex-col justify-center items-center py-5 relative ">
         <FormNavigation  prevPath={prevPath} firstPart={firstPart} nextPath={nextPath}/>
           <div className="flex justify-center gap-x-2 sm:gap-x-7  transform translate-x-7 sm:translate-0 -translate-y-7 sm:-translate-y-8 ">
             <DownloadPDFButton resumeRef={resumeRef}/>
           {isReviewPage && <Previewpanel templateId={path.split("/")[1] as TemplateKey} isReveiwPage={false}/>}
           </div>
          
           <div className="origin-top scale-[.7] sm:scale-[.77]  md:scale-100 mt-4 ReviewPageResponsive">
            <Previews resumeRef={resumeRef}/>
           </div>
       </div>
    )
}