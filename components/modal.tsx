"use client";
import Previews from "@/app/(editor)/components/preview";
import SettingPanel from "@/app/(editor)/components/SettingPanel/settingpanel";
import { RootState } from "@/store";
import { setAddSection, setTemplateChange } from "@/store/slices/styleSlice";
import { AnimatePresence, motion } from "motion/react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import AllSections from "./allsection";
import CustomLayout from "@/app/(editor)/components/customlayout";
import { useEffect } from "react";
import UpdateDragData from "@/utils/updateDragdata";
import { TemplateKey } from "@/app/(editor)/[templateId]/layout";
import Portal from "./portal";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<{ show: boolean; onlyPreview?: boolean }>
  >;
  showModal: { show: boolean; onlyPreview?: boolean };
  templateId: TemplateKey;
}
export default function Modal({
  setShowModal,
  showModal,
  templateId,
}: ModalProps) {
  const AddSection = useSelector((state: RootState) => state.style.addSection);
  const templateName = AddSection[templateId];
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowModal({ show: false, onlyPreview: false });
    dispatch(setTemplateChange(false));
    dispatch(
      setAddSection({
        isShow: false,
        [templateId]: {
          first: templateName.first,
          second: templateName.second,
          other: templateName.other,
        },
        customsection: false,
        tempalteUsedName: templateId,
      })
    );
  };
  const handleAdd = (title: string, value: string) => {
    const unusedsection =
      AddSection.unusedsection?.filter((d) => d !== title) ?? [];
    let first = templateName.first ?? [];
    let second = templateName.second ?? [];
    let other = templateName.other ?? [];
    if (templateName.first.includes(title)) {
      first = first.filter((d) => d !== title);
    } else if (templateName.second.includes(title)) {
      second = second.filter((d) => d !== title);
    }
    if (templateName.other.includes(title)) {
      if (templateName.first.includes(title)) {
      } else if (templateName.second.includes(title)) {
      } else other = other.filter((d) => d !== title);
    } else if (!templateName.other.includes(title)) {
      if (templateName.first.includes(title)) {
      } else if (templateName.second.includes(title)) {
      } else {
        other = [...other, title];
      }
    }

    if (value === "above") {
      first = [...first, title];
    } else if (value === "below") {
      second = [...second, title];
    }
    dispatch(
      setAddSection({
        isShow: true,
        unusedsection,
        [templateId]: { first, second, other },
        tempalteUsedName: templateId,
      })
    );
    sessionStorage.setItem(
      "templateIdData",
      JSON.stringify({ first, second, other })
    );
    sessionStorage.setItem("unusedsectionData", JSON.stringify(unusedsection));
    UpdateDragData(dispatch, first, second, templateId, title, value);
  };
  const handleRemove = (title: string) => {
    const first = templateName?.first.filter((d) => d !== title) ?? [];
    const second = templateName?.second.filter((d) => d !== title) ?? [];
    const other = templateName?.other.filter((d) => d !== title) ?? [];
    const unusedsection = [...(AddSection.unusedsection ?? []), title];

    dispatch(
      setAddSection({
        isShow: true,
        unusedsection: unusedsection,
        [templateId]: { first, second, other },
        tempalteUsedName: templateId,
      })
    );
    sessionStorage.setItem(
      "templateIdData",
      JSON.stringify({ first, second, other })
    );
    sessionStorage.setItem("unusedsectionData", JSON.stringify(unusedsection));
    UpdateDragData(dispatch, first, second, templateId, "");
  };
  useEffect(() => {
     const gettemplateData = sessionStorage.getItem("templateIdData") || "";
     const unusedsectionData = sessionStorage.getItem("unusedsectionData") ||  "";
     if(gettemplateData && unusedsectionData){
      const templateData = JSON.parse(gettemplateData);
      const unusedData = JSON.parse(unusedsectionData);
      dispatch(setAddSection({isShow:false,unusedsection:unusedData,[templateId]:templateData,tempalteUsedName: templateId}))
     }else{
         const FilterUnused = AddSection?.unusedsection?.filter((d) =>
          !templateName.first.includes(d) && !templateName.second.includes(d)) ?? [];
    dispatch(
      setAddSection({
        isShow: false,
        [templateId]: {
          first: templateName.first,
          second: templateName.second,
          other: templateName.other,
        },
        unusedsection: FilterUnused,
        tempalteUsedName: templateId,
      })
    );
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isTemplate = templateId === "template2" ? "grid-cols-2" : "grid-cols-1";
  const isTemplatetitle1 =
    templateId === "template1"
      ? "Above"
      : templateId === "template2"
      ? "Left"
      : "";
  const isTemplatetitle2 =
    templateId === "template1"
      ? "Below"
      : templateId === "template2"
      ? "Right"
      : "";
  
  return (
   <Portal>
     <motion.div
      key="modal"
      className="fixed z-10 inset-0 bg-black/70 flex items-center justify-center min-h-screen "
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`bg-white rounded-2xl overflow-hidden  ${
          AddSection.customsection ? "max-w-5xl" : "lg:w-6xl xl:w-7xl"
        } overflow-y-auto relative p-3  shadow-2xl h-[90vh] mx-4 ${
          showModal.onlyPreview ? "w-fit" : "w-full"
        } `}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="sticky -top-0 z-10 bg-white text-black border-b flex items-center py-2.5 justify-between -translate-y-3">
          <div className="flex items-center gap-x-12">
            {AddSection.isShow && (
              <button
                type="button"
                className="font-bold text-lg underline-offset-2 hover:underline cursor-pointer ps-2"
                onClick={() => {
                  if (AddSection.isShow && !AddSection.customsection) {
                    dispatch(
                      setAddSection({ isShow: false, customsection: false })
                    );
                  } else if (AddSection.customsection) {
                    dispatch(
                      setAddSection({ isShow: true, customsection: false })
                    );
                  }
                }}
              >
                Back
              </button>
            )}
            <h2 className="text-2xl font-bold px-2">
              {AddSection ? "Add Section" : "Resume Preview"}
            </h2>
            {showModal.onlyPreview && (
              <button
                type="button"
                className="text-md font-bold text-sky-700 cursor-pointer underline-offset-2 hover:underline"
                onClick={() => setShowModal({ show: true, onlyPreview: false })}
              >
                Change Template and Style
              </button>
            )}
          </div>
          <IoMdCloseCircle
            className=" text-red-500 text-3xl cursor-pointer transition-transform hover:scale-110"
            onClick={handleClose}
          />
        </div>
        <AnimatePresence mode="wait">
          {AddSection.isShow ? (
            AddSection.customsection ? (
              <motion.div
                key="custom-section"
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -500, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-center font-bold text-3xl">
                  Custom Section
                </h2>
                <CustomLayout templateId={templateId}/>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key="add-section"
                  initial={{ x: -500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -500, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 p-5 justify-items-center gridLayout"
                >
                  {AddSection.unusedsection?.map((d) => (
                    <AllSections
                      key={d}
                      title={d}
                      usedsection={false}
                      handleAdd={handleAdd}
                      templateId={templateId}
                    />
                  ))}
                </motion.div>
                <h2 className=" text-center font-semibold text-2xl mt-3 mb-2">
                  Used Section
                </h2>
                <div className="border"></div>
                <motion.div className={`grid ${isTemplate}`}>
                  <div>
                    <h2 className="text-center font-bold underline underline-offset-4 pb-3 pt-1">
                      {/* Above */}
                      {isTemplatetitle1}
                    </h2>
                    <div className="flex flex-wrap gap-x-5">
                      {templateName?.first.map((d) => (
                        <AllSections
                          key={d}
                          title={d}
                          usedsection={true}
                          AddAbove={true}
                          handleRemove={handleRemove}
                          handleAdd={handleAdd}
                          templateId={templateId}
                        />
                      ))}
                    </div>
                  </div>
                  {!templateId.includes("template3") && (
                    <div>
                      <h2 className="text-center font-bold underline underline-offset-4 pb-3 pt-1">
                        {/* Below */}
                        {isTemplatetitle2}
                      </h2>
                      <div className="flex flex-wrap gap-x-5">
                        {templateName?.second.map((d) => (
                          <AllSections
                            key={d}
                            title={d}
                            usedsection={true}
                            AddAbove={false}
                            handleRemove={handleRemove}
                            handleAdd={handleAdd}
                            templateId={templateId}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </>
            )
          ) : (
            <motion.div
              key="preview-section"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex h-auto md:h-[calc(100%-3.5rem)] flex-col md:flex-row"
            >
              {/* <div className={`${showModal.onlyPreview ? "w-fit" : " flex flex-col md:flex-row max-w-7xl"}`}> */}
              <div
                className={`  justify-items-center overflow-y-auto overflow-x-hidden ${
                  showModal.onlyPreview ? "w-full" : "md:w-6/12"
                }`}
              >
                <Previews
                  previewStyle={`${
                    showModal.onlyPreview
                      ? "scale-[.9]"
                      : "scale-[.5] sm:scale-[.6] md:scale-[.55] lg:scale-[.6] xl:scale-[.75] prviewScale  "
                  } transform  mt-5 `}
                  highlightShow={false}
                />
              </div>
              {!showModal.onlyPreview && (
                <motion.div
                  key="style-section"
                  className=" flex-1 overflow-y-auto text-black -translate-y-5/12 md:-translate-y-0 "
                  // initial={{ x: "100%", opacity: 0 }}
                  // animate={{ x: 0, opacity: 1 }}
                  // exit={{ x: "100%", opacity: 0 }}
                  // transition={{ type: "spring", stiffness: 300 }}
                >
                  <SettingPanel templateId={templateId} />
                </motion.div>
              )}
              {/* </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
   </Portal>
  );
}
