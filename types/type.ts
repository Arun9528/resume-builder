import { customtypes } from "@/store/slices/styleSlice";
import { FieldValues } from "react-hook-form";

interface Education {
  Degree: string;
  SchoolName: string;
  Date: number;
  place: string;
}
interface Passion {
  title: string;
  Description: string;
}
// interface communication{
//     id:string;
//     link:string
// }
interface similer {
  Name: string;
  Phone: number;
  Email: string;
  City: string;
  Jobtitle?: string;
  // State:string;
  Educations: Education | Education[];
  Skills: string | string[];
  Hobbies?: string | string[];
  Summary: string;
  Passions?: Passion | Passion[];
  Workfor?: string;
  communicatelink: communication | communication[];
}
interface Project {
  title: string;
  Description: string;
  Link: string;
  Language?: string | string[];
}
interface Experience {
  title: string;
  Company: string;
  StartDate: number;
  EndDate: number | string;
  Place: string;
}
interface Course {
  title: string;
  Date?: number;
  Description: string;
  Certificate: string;
}
interface Achievement {
  title: string;
  Description: string;
}
interface Strength {
  title: string;
  Description: string;
}

export interface TemplateforWebdev extends similer {
  Projects: Project | Project[] | null;
  Experiences: Experience | Experience[] | null;
  Courses: Course | Course[] | null;
  Achievements?: Achievement | Achievement[] | null;
  Strengths?: Strength | Strength[];
}

//---------------------------------------Navigation Slice----------------------------------------------------------
export interface PathState {
  prevPath: string | null;
  nextPath: string | null;
  firstPart: string | null;
}
export interface NavigationState {
  pathnames:string[];
  modifynames:string[];
}
//--------------------------Main Content Sections-------------------------------------------
export interface Navigates {
  name: string;
  prevpath: string;
  nextpath: string;
}
//--------------------------------------------------New Thinking------------------------------------------------

export interface communication extends FieldValues {
  id?: string;
  link: string;
}
export interface Headings {
  name: string;
  phone: string;
  city?: string;
  email: string;
  communicatelink: Array<{ id: string; link: string }>;
  jobtitle?: string;
  profilephoto?:string;
  locationtitle?:string;
}
export interface Skills {
  id: string;
  langugages: string;
}
export interface SkillsValues{
    skillInputValue:string
    isWebDev:boolean
    WebDevValue:Skills[]
}

export interface ExperienceProps {
  id: string;
  company: string;
  jobtitle: string;
  explocation: string;
  startDate: string;
  endDate: string | "Present";
  month:string
  present: boolean;
  noexperience: boolean;
  description: Array<{ value: string }>;
}
export type ProjectsData = {
  id: string;
  projectname: string;
  description: string;
  projectLink:string;
};
export type EducationData = {
  id: string;
  collegename: string;
  degree: string;
  startdate: string;
  enddate: string;
  stillgoingon: boolean;
  Educationlocation: string;
};
export type AchievementData = {
  id: string;
  achievementsname: string;
  description: string;
};
export type StrengthData = {
  id: string;
  strengthsname: string;
  description: string;
};
export interface AwardsData {
  id: string;
  awardsname: string;
  awardcompanyname: string;
}
export interface CertificateData{
  id:string;
  certificateName:string;
  certificationcompanyname:string;
}
export interface HobbiesData{
  id:string;
  hobbyname:string;
  description:string;
}
export interface TrainingandCourseData{
  id:string;
  trainingandCoursename:string;
  description:string;
}
export interface SummaryData{
  description:string
}
export interface LanguageData{
  id:string;
  languagename:string;
  level:string;
}
export interface VolunteeringData{
  id:string;
  jobtitle:string;
  companyname:string;
  startdate: string;
  enddate: string | "present";
  present: boolean;
  description:string;
}
export interface PublicationData{
  id:string;
  maintitle:string;
  publicationsubtitle:string;
  publishdate:string;
  publishlink:string;
  description:string;
}
export interface CustomData extends customtypes{
  id:string;
}
export interface CustomPageData{
  id:string;
  maintitle:string;
  customtitle:string;
  customsubtitle:string;
  customwithdate:string;
  customwithoutdate:string;
  customstartEnddate:{
    startdate:string;
    endate:string;
    present:boolean;
  }
  customlocation:string;
  customlink:string;
  customlayout:"normal" | "double"
  customdescription:Array<{value:string}>;
}
//----------------------------------Rearrenge ---------------------------
