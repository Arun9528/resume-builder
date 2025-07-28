"use client";
import {
  SlideinformLeftChild,
  SlideinformLeftParent,
  Slideleft,
} from "@/animations";
import { categorizedLanguages } from "@/data/languages";
import { useNavigation } from "@/hooks/useNavigation";
import { RootState } from "@/store";
import { addSkills, removeSkills } from "@/store/slices/resumeSlice";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ChangeEvent,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import { SkillsValues } from "@/types/type";

export default function Skills() {
  const [isWebDevlopemnt, setIsWebDevlopment] = useState<boolean>(false);
  const [selectLanguage, setSelectLanguage] = useState<string | null>(null);
  const [isError, SetIsError] = useState<boolean>(false);
  const [ErrorNext, setErrorNext] = useState<boolean>(false);
  const searchCategory = categorizedLanguages.find(
    (g) => g.category === selectLanguage
  );
  const SelectSkils = useSelector(
    (state: RootState) => state.resumeBuilder.skills
  );
  const dispatch = useDispatch();
  const { firstPart, prevPath, nextPath } = useNavigation();
  const SaveResumeData = useSaveResumeData()
  const rounter = useRouter();
  const handleDublicateLang = (lang: string) => {
    const CheckingDublicateLang = SelectSkils?.WebDevValue?.some(
      (d) => d.langugages === lang
    );
    if (!CheckingDublicateLang) {
      const data = { WebDevValue:[{id: crypto.randomUUID(), langugages: lang}],isWebDev:true,skillInputValue:""}
      dispatch(addSkills(data));
      SaveResumeData(dispatch,true,{first:[],second:[],other:[]},data)
    } else {
      SetIsError(true);
    }
  };
  useEffect(() => {
    if (!isError) return;
    const timeout = setTimeout(() => {
      SetIsError(false);
      setErrorNext(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isError]);

  const handleSkills = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    const data = {skillInputValue:e.target.value,isWebDev:false,WebDevValue:[]}
    if(isError){
      SetIsError(false);
    }
    dispatch(addSkills(data))
    sessionStorage.setItem("skills",JSON.stringify(data));
  }
  const onNext = () => {
    if(!SelectSkils.isWebDev && !SelectSkils.skillInputValue){
      SetIsError(true);
      return
    }
    if (SelectSkils.isWebDev && SelectSkils?.WebDevValue!.length < 1) {
      setErrorNext(true);
      SetIsError(true);
      return;
    }
    if (nextPath) {
      rounter.push(`/${firstPart}${nextPath}`);
    }
  };
  return (
    <>
      <motion.div
        className="py-4 pt-8"
        variants={SlideinformLeftParent}
        initial="hidden"
        animate="visible"
      >
        <FormNavigation
          firstPart={firstPart}
          prevPath={prevPath}
          nextPath={nextPath}
          onNext={onNext}
        />
        <div className="flex justify-center gap-x-9 pb-6">
          <button
            type="button"
            className={`w-40 border text-center rounded-2xl py-1 cursor-pointer hover:bg-teal-500 hover:text-white
             hover:border-teal-300 ${!isWebDevlopemnt && "bg-teal-500 text-white"}`}
            onClick={() => setIsWebDevlopment(false)}
          >
            Input
          </button>
          <button
            type="button"
            className={`w-40 border text-center rounded-2xl py-1 cursor-pointer hover:bg-teal-500 hover:text-white
             hover:border-teal-300 ${isWebDevlopemnt && "bg-teal-500 text-white"}`}
            onClick={() => setIsWebDevlopment(true)}
          >
            Web Development
          </button>
        </div>
        {isWebDevlopemnt ? (
          <div>
            <div className="flex items-center pt-3">
              <h3 className="font-bold me-2">Selected Language:</h3>
              <div className="flex flex-wrap  gap-2">
                <AnimatePresence mode="popLayout">
                  {SelectSkils?.WebDevValue!.length > 0 ? (
                    SelectSkils?.WebDevValue?.map(({ id, langugages }) => (
                      <motion.div
                        key={id}
                        id={id}
                        className="flex  items-center  rounded-lg py-.5  overflow-hidden"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{
                          x: -10,
                          opacity: 0,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <p className="bg-gray-200 dark:text-black font-medium px-2">
                          {langugages}
                        </p>
                        <button
                          type="button"
                          className=" text-white font-semibold px-2 bg-red-500  cursor-pointer "
                          onClick={() => {
                            const filterWebData = SelectSkils.WebDevValue.filter(d => d.id !== id);
                            const WebData:SkillsValues = {isWebDev:true,WebDevValue:filterWebData,skillInputValue:""}
                            dispatch(removeSkills(id))
                            sessionStorage.setItem("skills",JSON.stringify(WebData))
                          }}
                        >
                          x
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      className="ms-4"
                      variants={Slideleft}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {" "}
                      Please Select the Language
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex py-5 ">
              <div className="basis-[230px]  space-y-2">
                {categorizedLanguages.map(({ category }, i) => (
                  <div key={i}>
                    <p
                      className={` font-semibold cursor-pointer ${
                        selectLanguage === category
                          ? "text-sky-700 font-bold"
                          : ""
                      }`}
                      onClick={() => setSelectLanguage(category)}
                    >
                      {category}
                    </p>
                  </div>
                ))}
              </div>
              <motion.div
              className="flex-1 content-center"
              key={selectLanguage}
              variants={SlideinformLeftChild}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-wrap gap-5">
                {searchCategory?.languages.map((lang, i) => {
                  const selectedLang = SelectSkils?.WebDevValue?.some(
                    (d) => d.langugages === lang
                  );
                  return (
                    <motion.span
                      className={`px-5 py-1.5 rounded-2xl cursor-pointer border ${
                        selectedLang
                          ? "bg-green-700 text-white border-green-700 "
                          : "hover:bg-gray-500 hover:border-gray-500 hover:text-white hover:transition-colors hover:duration-300"
                      }`}
                      key={i}
                      onClick={() => handleDublicateLang(lang)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: i * 0.1 }}
                    >
                      {lang}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
            </div>

            
            <AnimatePresence mode="wait">
              {isError && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 10, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.3, stiffness: 300, type: "spring" }}
                  className={`fixed top-8 left-1/2 -translate-x-1/2 rounded-md py-2 ${
                    ErrorNext ? "bg-red-600" : "bg-green-600 "
                  } px-3 z-50 shadow-lg text-white`}
                >
                  {ErrorNext
                    ? "Please Choose at least one the Language "
                    : " This language is already selected."}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative">
            <label htmlFor="skills" className="block text-lg font-bold">
              Write Your Skills
            </label>
            <textarea
              id="skills"
              className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400 placeholder:font-semibold"
              rows={5}
              placeholder="Please Write Your Skills"
              onChange={handleSkills}
              value={SelectSkils.skillInputValue}
            />
            {isError && (
              <p className="text-red-500 text-lg absolute top-full">
                Skills is Required
              </p>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
}
