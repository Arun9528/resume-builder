"use client";
import { AnimatePresence } from "motion/react";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import Previews from "./preview";
import { TemplateKey } from "../[templateId]/layout";
export default function Previewpanel({ templateId,isReveiwPage}: { templateId: TemplateKey,isReveiwPage:boolean}) {
  const paths = usePathname();
  const CurrentPath = paths.includes("review");

  const [showModal, setShowModal] = useState<{
    show: boolean;
    onlyPreview?: boolean;
  }>({ show: false, onlyPreview: false });
  const isChange = useSelector(
    (state: RootState) => state.style.templateChange
  );
  
  useEffect(() => {
    if(!isChange) return
    if (isChange) {
      setShowModal({ show: true, onlyPreview: false });
    }
  }, [isChange]);

  const handleOpenModal = () => {
    setShowModal({ show: true, onlyPreview: false });
  };
    if(CurrentPath && isReveiwPage){
        return null;
    }
  return (
    <>
      <div 
        className={ `  md:flex justify-center items-start ${CurrentPath ? "" : "sticky top-0 p-2 lg:p-3 "}`}
      >
        {
        CurrentPath ? "" : 
        ( 
          <Previews
            previewStyle="origin-top relative hidden md:block md:shrink-0 top-20 2xl:scale-[.42] xl:scale-[.39] lg:scale-[.34] md:scale-[.35] hover:outline-4 hover:outline-sky-600 cursor-pointer mainPreviewScale"
            highlightShow={true}
            setShowModal={setShowModal}
          />
        )
       }
        {CurrentPath && (
          <button
            type="button"
            className="  bg-sky-500 py-1.5 px-2 sm:px-4 text-white rounded-sm cursor-pointer text-[14px] sm:text-[16px] "
            onClick={handleOpenModal}
          >
            Edit
          </button>
        )}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {showModal.show && (
          <Modal
            key="modal"
            setShowModal={setShowModal}
            showModal={showModal}
            templateId={templateId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
