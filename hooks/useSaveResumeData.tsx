"use client"
import { AppDispatch } from "@/store";
import {
  addAchievement,
  addAward,
  addCertificate,
  addCustomPageData,
  addEducaiton,
  addExperience,
  addHobby,
  addLanguage,
  addProjects,
  addPublication,
  addResumeHeading,
  addSkills,
  addStrength,
  addSummary,
  addtrainingandcourse,
  addVolunteering,
} from "@/store/slices/resumeSlice";
import { customtypes, tempaltetypes } from "@/store/slices/styleSlice";
import {
  AchievementData,
  AwardsData,
  CertificateData,
  CustomData,
  CustomPageData,
  EducationData,
  ExperienceProps,
  Headings,
  HobbiesData,
  LanguageData,
  ProjectsData,
  PublicationData,
  SkillsValues,
  StrengthData,
  SummaryData,
  TrainingandCourseData,
  VolunteeringData,
} from "@/types/type";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
type propsData =
  | Headings
  | SkillsValues
  | ProjectsData
  | EducationData
  | AchievementData
  | StrengthData
  | ExperienceProps
  | customtypes
  | AwardsData
  | CertificateData
  | HobbiesData
  | TrainingandCourseData
  | LanguageData
  | VolunteeringData
  | PublicationData
  | CustomData
  | CustomPageData
  | SummaryData
export default function useSaveResumeData() {
const paths = usePathname();
const pageName = paths.split("/")[2];
const SaveResumeData = useCallback((  dispatch: AppDispatch,
  isSave: boolean,
 templateData?:tempaltetypes,
  data?: propsData)=>{
    
    if (isSave) {
      let storedSessionData:propsData[]  = [];
      if(pageName !== "skills"){
        const Getdata = sessionStorage.getItem(pageName) || "";
      if(Getdata && pageName !== "heading"){
        const parsedData = JSON.parse(Getdata);
        storedSessionData = [...parsedData,data]
      }else{
        storedSessionData.push(data!)
      }
      }
    switch (pageName) {
      case "heading":
        sessionStorage.setItem(pageName, JSON.stringify(data));
        break;
      case "experience":
      case "projects":
      case "education":
      case "achievements":
      case "strengths":
      case "awards":
      case "volunteering":
      case "certification":
      case "publication":
      case "trainingandcourses":
      case "hobbies":
      case "languages":
        sessionStorage.setItem(pageName, JSON.stringify(storedSessionData));
        break;
      case "skills":
        const newSkillData = data as SkillsValues;
        const existingSkills = sessionStorage.getItem(pageName) || "";
        let StoredData:SkillsValues = existingSkills ? JSON.parse(existingSkills) :  
        {
        skillInputValue: "",
        isWebDev: false,
        WebDevValue: [],
      };
      if(newSkillData.isWebDev){
         StoredData = {skillInputValue:"",isWebDev:true,WebDevValue:[...StoredData?.WebDevValue,...newSkillData?.WebDevValue]}
      }
      sessionStorage.setItem(pageName,JSON.stringify(StoredData))
        break;
      default:
        sessionStorage.setItem(pageName,JSON.stringify(storedSessionData))
        break;
    }
  } else {
    const isSaveSection = sessionStorage.getItem("templateIdData") || "";
    const getSection:tempaltetypes = isSaveSection ? JSON.parse(isSaveSection) : templateData;
    const allSection = new Set(["heading",...getSection?.first, ...getSection?.second, ...getSection?.other]);
    const removecustom = [...allSection].map((d) => d.replaceAll(" (custom)", "").trim()).filter(Boolean);
    removecustom.forEach((section) => {
      const isChecking = section  === "training / courses" ? "trainingandcourses" : section;
      const storedData = sessionStorage.getItem(isChecking) || "";
      if (!storedData) return;
      // if (storedData) {
        const parsedData = JSON.parse(storedData); 
        switch (isChecking) {
          case "heading":
            dispatch(addResumeHeading(parsedData));
            break;
          case "skills":
            dispatch(addSkills(parsedData));
            break;
          case "summary":
            dispatch(addSummary(parsedData))
          default:
            if(Array.isArray(parsedData)){
              parsedData.forEach((item)=>{
               switch(isChecking){
                 case "experience":
            dispatch(addExperience(item));
            break;
          case "projects":
            dispatch(addProjects(item));
            break;
          case "education":
            dispatch(addEducaiton(item));
            break;
          case "achievements":
            dispatch(addAchievement(item));
            break;
          case "strengths":
            dispatch(addStrength(item));
            break;
          case "awards":
            dispatch(addAward(item))
            break;
          case "volunteering":
            dispatch(addVolunteering(item));
            break;
          case "certification":
            dispatch(addCertificate(item));
            break;
          case "publication":
            dispatch(addPublication(item))
            break;
          case "trainingandcourses":
            dispatch(addtrainingandcourse(item));
            break;
          case "hobbies":
            dispatch(addHobby(item));
            break;
          case "languages":
            dispatch(addLanguage(item));
            break;
          default:
            dispatch(addCustomPageData(item))
            break;
               }
              })
            }
        }
      }
    // }
  );
  }
},[pageName])
  return SaveResumeData
}
