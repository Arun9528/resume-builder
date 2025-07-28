"use client"
import React, { RefObject, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeadingSection from "./ResumeSections/headingsection";
import SkillsSections from "./ResumeSections/skillssections";
import ExperienceSections from "./ResumeSections/experiencesection";
import ProjectsSection from "./ResumeSections/projectssections";
import EducationSection from "./ResumeSections/educationsection";
import AchivementSection from "./ResumeSections/achievementsection";
import StrengthSection from "./ResumeSections/strengthsection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import VolunteeringSection from "./ResumeSections/volunteeringsection";
import CertificationSection from "./ResumeSections/certificationsection";
import AwardSection from "./ResumeSections/awardsection";
import PublicationSection from "./ResumeSections/publicationsection";
import TraningAndCourseSection from "./ResumeSections/traningandcoursesection";
import LanguagesSection from "./ResumeSections/languagessection";
import SummarySection from "./ResumeSections/summarysection";
import CustomSection from "./ResumeSections/customsection";
import HobbySection from "./ResumeSections/hobbysection";
import SplitColumns from "@/utils/splitColumns";
import {
  customtypes,
  fontSizetypes,
  setAddSection,
  setCustomlayoutData,
  setDragDefault,
  setFontColor,
  setFontSize,
  setFontStyle,
  setlineHeight,
  setPadding,
  setSpacing,
} from "@/store/slices/styleSlice";
import { initialSection } from "./SettingPanel/StyleTab/rearrange";
import { TemplateKey } from "../[templateId]/layout";
import useSaveResumeData from "@/hooks/useSaveResumeData";
interface PreviewsProps {
  previewStyle?: string;
  highlightShow?: boolean;
  setShowModal?: React.Dispatch<
    React.SetStateAction<{ show: boolean; onlyPreview?: boolean }>
  >;
  resumeRef?: RefObject<HTMLDivElement | null>;
}
type styleprops = {
  font: fontSizetypes;
  lineHeight: number;
  spacing: string;
  padding: string;
};
export default function Previews({
  previewStyle = "",
  highlightShow,
  setShowModal,
  resumeRef,
}: PreviewsProps) {
  const paths = usePathname();
  const {
    padding,
    spacing,
    fontColor,
    fontSize,
    lineHeight,
    fontStyle,
    layout,
    DragDefault,
    isModalOpen,
    spacingNumber,
  } = useSelector((state: RootState) => state.style);
  const customlayoutDatalist = useSelector(
    (state: RootState) => state.style.addSection.customlayoutData
  );
  const AddSections = useSelector((state: RootState) => state.style.addSection);
  const SaveResumeData = useSaveResumeData();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isClient,setIsClient] = useState<boolean>(false);
  const [dragData, setDragData] = useState<initialSection>({
    first: [],
    secondLeft: [],
    secondRight: [],
    secondAll: [],
  });
  const dispatch = useDispatch();
  const whichTemplate = paths.split("/")[1];
  const Istemplate = AddSections[whichTemplate as TemplateKey];
  const { left, right } = SplitColumns(Istemplate.second);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--current-font", fontStyle);
  }, [fontStyle]);

  const allSections = [
    <SkillsSections
      key="skills"
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <ExperienceSections
      key="experience"
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <ProjectsSection
      key={"projects"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <EducationSection
      key={"education"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <AchivementSection
      key={"achievements"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <StrengthSection
      key={"strengths"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <VolunteeringSection
      key={"volunteering"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <CertificationSection
      key={"certification"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <AwardSection
      key={"awards"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <PublicationSection
      key={"publication"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <TraningAndCourseSection
      key={"training / courses"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <HobbySection
      key={"hobbies"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <LanguagesSection
      key={"languages"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,
    <SummarySection
      key={"summary"}
      highlightShow={highlightShow!}
      paths={paths}
      fontColor={fontColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      spacing={spacing}
    />,

  ];
  const newCustomSection =
    customlayoutDatalist.length > 0
      ? customlayoutDatalist?.map((data) => (
          <CustomSection
            key={`${data.maintitle} (custom)`}
            highlightShow={highlightShow!}
            paths={paths}
            fontColor={fontColor}
            fontSize={fontSize}
            lineHeight={lineHeight}
            spacing={spacing}
            layoutData={data}
          />
        ))
      : [];
  const AllNewSection = [...allSections, ...newCustomSection];
  useEffect(() => {
    if (isModalOpen) return;
    if (!isModalOpen) {
      setIsOpen(false);
    }
  }, [isModalOpen]);
  const sectionMap = new Map(AllNewSection.map((d) => [d.key, d]));
  const Renderfirst = 
     isOpen
    ? dragData.first.length > 0 ? dragData.first : Istemplate.first
    :  DragDefault?.first;
  const RenderSecond = 
    isOpen
    ? dragData.secondAll.length > 0 ? dragData.secondAll : Istemplate.second
    : DragDefault?.secondAll;
  const topSection = Renderfirst?.map((key) => sectionMap.get(key)).filter(
    Boolean
  );
  const rightSidesection = RenderSecond?.map((key) =>
    sectionMap.get(key)
  ).filter(Boolean);
  const RenderLeft = 
     isOpen
    ? dragData.secondLeft.length > 0 ? dragData.secondLeft : left
    : DragDefault.secondLeft;
  const RenderRight = 
    isOpen
    ? dragData.secondRight.length > 0 ? dragData.secondRight : right
    :  DragDefault.secondRight;
  const defaultleft = RenderLeft.map((key) => sectionMap.get(key)).filter(
    Boolean
  );
  const defaultright = RenderRight.map((key) => sectionMap.get(key)).filter(
    Boolean
  );
  const oneSection = [...topSection, ...defaultleft, ...defaultright];

  useEffect(() => {
    const hasInitialized = sessionStorage.getItem("hasPreviewInitialized");
    if(!hasInitialized){
        const PairColor = sessionStorage.getItem("Resumecolor") || "";
    if (PairColor) {
      const ResumeColor = JSON.parse(PairColor);
      dispatch(
        setFontColor({
          inner: ResumeColor.secondaryColor,
          outer: ResumeColor.primaryColor,
        })
      );
    }
    const isFont = sessionStorage.getItem("fontStyle") || "";
    if (isFont) {
      const ResumeFont = JSON.parse(isFont);
      dispatch(setFontStyle(ResumeFont));
    }
    const isStyletype = sessionStorage.getItem("styletype") || "";
    if (isStyletype) {
      const ResumeStyletype = JSON.parse(isStyletype) as Partial<styleprops>;
      if (ResumeStyletype.padding) {
        dispatch(setPadding(ResumeStyletype.padding));
      }
      if (ResumeStyletype.spacing) {
        dispatch(setSpacing(ResumeStyletype.spacing));
      }
      if (ResumeStyletype.font) {
        dispatch(setFontSize(ResumeStyletype.font));
      }
      if (ResumeStyletype.lineHeight) {
        dispatch(setlineHeight(ResumeStyletype.lineHeight));
      }
    }
    const istemplateData = sessionStorage.getItem("templateIdData") || "";
    const isunsedData = sessionStorage.getItem("unusedsectionData") || "";
    
    if(istemplateData && isunsedData){
      const storedTemplatedata = JSON.parse(istemplateData);
      const storedUseddata = JSON.parse(isunsedData);
      dispatch(setAddSection({isShow:false,[whichTemplate]:storedTemplatedata,unusedsection:storedUseddata,
        tempalteUsedName:whichTemplate}))
    }

    const isCustomLayoutData = sessionStorage.getItem("customLayouts") || "";
    if(isCustomLayoutData){
      const storedCustomLayoutData:customtypes[] = JSON.parse(isCustomLayoutData);
      storedCustomLayoutData.forEach(d=> {dispatch(setCustomlayoutData(d))})
    }
    
    SaveResumeData(dispatch,false,Istemplate)
     sessionStorage.setItem("hasPreviewInitialized", "true");
    }
     const drag = sessionStorage.getItem("dragContents") || "";
    if (drag) {
      const dragData = JSON.parse(drag);
      setDragData(dragData);
      dispatch(setDragDefault(dragData))
    }
     setIsClient(true)
  }, [dispatch, whichTemplate, Istemplate,SaveResumeData]);
  useEffect(() => {
  const handleBeforeUnload = () => {
    sessionStorage.removeItem("hasPreviewInitialized");
  };
  
  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, []);
  const getSpacing = spacingNumber === 1 ? 0 : 0.5;
  return (
   isClient && (

     <div
      className={`w-[794px] h-[1123px] border box-border ${previewStyle} fontStyle transition-all duration-300`}
      style={{ padding,transformOrigin:"top center"}}
      onClick={() => setShowModal?.({ show: true, onlyPreview: true })}
      ref={resumeRef as RefObject<HTMLDivElement>}
      id="resume-preview"
    >
      <div>
        <HeadingSection
          highlightShow={highlightShow!}
          paths={paths}
          fontColor={fontColor}
          fontSize={fontSize}
          lineHeight={lineHeight}
          spacing={spacing}
          isTemplate={whichTemplate}
        />
      </div>
      {whichTemplate === "template1" && (
        <>
          <div className="flex flex-col" style={{ gap: spacing }}>
            {topSection}
          </div>
          <div className="grid grid-cols-2" style={{ gap: spacing }}>
            <div className="flex flex-col" style={{ gap: spacing }}>
              {defaultleft}
            </div>
            <div className="flex flex-col" style={{ gap: spacing }}>
              {defaultright}
            </div>
          </div>
        </>
      )}
      {whichTemplate === "template2" && (
        <div
          className={`${
            layout.layoutClass || "column_layout_2"
          } justify-between`}
        >
          <div
            className="flex flex-col"
            style={{
              rowGap: spacing,
              width: `${100 - (spacingNumber + getSpacing)}%`,
            }}
          >
            {topSection}
          </div>
          <div
            className="flex flex-col justify-self-end"
            style={{
              rowGap: spacing,
              width: `${100 - (spacingNumber + getSpacing)}%`,
            }}
          >
            {rightSidesection}
          </div>
        </div>
      )}
      {whichTemplate === "template3" && (
        <div className="flex flex-col" style={{ rowGap: spacing }}>
          {oneSection}
        </div>
      )}
    </div>
   )
  );
}
