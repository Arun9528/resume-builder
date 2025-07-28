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
  Skills,
  SkillsValues,
  StrengthData,
  SummaryData,
  TrainingandCourseData,
  VolunteeringData,
} from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface templates {
  heading: Headings;
  skills: SkillsValues;
  experience: ExperienceProps[];
  currentExperience: ExperienceProps | null;
  project: ProjectsData[];
  education: EducationData[];
  achievement: AchievementData[];
  strength: StrengthData[];
  awards: AwardsData[];
  certificates: CertificateData[];
  hobbies: HobbiesData[];
  trainingandcourses: TrainingandCourseData[];
  summary: SummaryData;
  languages: LanguageData[];
  volunteering:VolunteeringData[];
  publication:PublicationData[];
  custom:CustomData[];
  customPageData:CustomPageData[];
}

const initialState: templates = {
  heading: {
    name: "",
    phone: "",
    // city:"",
    email: "",
    jobtitle: "",
    communicatelink: [],
  },
  skills: {
    skillInputValue:"",
    isWebDev:false,
    WebDevValue:[] as Skills[]
  },
  experience: [],
  currentExperience: null,
  project: [],
  education: [],
  achievement: [],
  strength: [],
  awards: [],
  certificates: [],
  hobbies: [],
  trainingandcourses: [],
  summary: {
    description: "",
  },
  languages: [],
  volunteering:[],
  publication:[],
  custom:[],
  customPageData:[]
};
export const resumeSlice = createSlice({
  name: "Resume",
  initialState,
  reducers: {
    addResumeHeading: (state, action: PayloadAction<Headings>) => {
      state.heading = {
        ...action.payload,
        communicatelink: action.payload.communicatelink.map((link) => ({
          ...link,
        })),
      };
    },
    addSkills: (state, action: PayloadAction<SkillsValues>) => {
      const {isWebDev,skillInputValue ,WebDevValue } = action.payload
      state.skills.isWebDev = isWebDev;
     if(isWebDev){
       if(WebDevValue){
         state.skills.WebDevValue = [...(state?.skills?.WebDevValue || []),...WebDevValue]
         state.skills.skillInputValue = skillInputValue;
       }
     }else{
         state.skills.skillInputValue = skillInputValue ?? "";
         state.skills.WebDevValue = WebDevValue;
     }
      
    },
    removeSkills: (state, action: PayloadAction<string>) => {
      state.skills.WebDevValue = state?.skills?.WebDevValue?.filter((d) => d.id !== action.payload);
    },
    addExperience: (state, action: PayloadAction<ExperienceProps>) => {
      const noExperienceTrue = state.experience.some(
        (d) => d.noexperience === true
      );
      if (noExperienceTrue) {
        state.experience = [action.payload];
      } else {
        state.experience.push(action.payload);
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(
        (exp) => exp.id !== action.payload
      );
    },
    updateExperience: (state, action: PayloadAction<ExperienceProps>) => {
      const index = state.experience.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.experience[index] = action.payload;
      }
    },
    addProjects: (state, action: PayloadAction<ProjectsData>) => {
      state.project.push(action.payload);
    },
    deleteProjects: (state, action: PayloadAction<string>) => {
      state.project = state.project.filter((p) => p.id !== action.payload);
    },
    updateProjects: (state, action: PayloadAction<ProjectsData>) => {
      const Index = state.project.findIndex((d) => d.id === action.payload.id);
      if (Index !== -1) {
        state.project[Index] = action.payload;
      }
    },
    addEducaiton: (state, action: PayloadAction<EducationData>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<EducationData>) => {
      const Index = state.education.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.education[Index] = action.payload;
      }
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((d) => d.id !== action.payload);
    },
    addAchievement: (state, action: PayloadAction<AchievementData>) => {
      state.achievement.push(action.payload);
    },
    updateAchievement: (state, action: PayloadAction<AchievementData>) => {
      const Index = state.achievement.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.achievement[Index] = action.payload;
      }
    },
    deleteAchievement: (state, action: PayloadAction<string>) => {
      state.achievement = state.achievement.filter(
        (d) => d.id !== action.payload
      );
    },
    addStrength: (state, action: PayloadAction<StrengthData>) => {
      state.strength.push(action.payload);
    },
    updateStrength: (state, action: PayloadAction<StrengthData>) => {
      const Index = state.strength.findIndex((d) => d.id === action.payload.id);
      if (Index !== -1) {
        state.strength[Index] = action.payload;
      }
    },
    deleteStrength: (state, action: PayloadAction<string>) => {
      state.strength = state.strength.filter((d) => d.id !== action.payload);
    },
    addAward: (state, action: PayloadAction<AwardsData>) => {
      state.awards.push(action.payload);
    },
    updateAward: (state, action: PayloadAction<AwardsData>) => {
      const Index = state.awards.findIndex((d) => d.id === action.payload.id);
      if (Index !== -1) {
        state.awards[Index] = action.payload;
      }
    },
    deleteAward: (state, action: PayloadAction<string>) => {
      state.awards = state.awards.filter((d) => d.id !== action.payload);
    },
    addCertificate: (state, action: PayloadAction<CertificateData>) => {
      state.certificates.push(action.payload);
    },
    updateCertificate: (state, action: PayloadAction<CertificateData>) => {
      const Index = state.certificates.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.certificates[Index] = action.payload;
      }
    },
    deleteCertificate: (state, action: PayloadAction<string>) => {
      state.certificates = state.certificates.filter(
        (d) => d.id !== action.payload
      );
    },
    addHobby: (state, action: PayloadAction<HobbiesData>) => {
      state.hobbies.push(action.payload);
    },
    updateHobby: (state, action: PayloadAction<HobbiesData>) => {
      const Index = state.hobbies.findIndex((d) => d.id === action.payload.id);
      if (Index !== -1) {
        state.hobbies[Index] = action.payload;
      }
    },
    deleteHobby: (state, action: PayloadAction<string>) => {
      state.hobbies = state.hobbies.filter((d) => d.id !== action.payload);
    },
    addtrainingandcourse: (
      state,
      action: PayloadAction<TrainingandCourseData>
    ) => {
      state.trainingandcourses.push(action.payload);
    },
    updatetrainingandcourse: (
      state,
      action: PayloadAction<TrainingandCourseData>
    ) => {
      const Index = state.trainingandcourses.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.trainingandcourses[Index] = action.payload;
      }
    },
    deletetrainingandcourses: (state, action: PayloadAction<string>) => {
      state.trainingandcourses = state.trainingandcourses.filter(
        (d) => d.id !== action.payload
      );
    },
    addSummary: (state, action: PayloadAction<SummaryData>) => {
      state.summary = action.payload;
    },
    addLanguage: (state, action: PayloadAction<LanguageData>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (state, action: PayloadAction<LanguageData>) => {
      const Index = state.languages.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.languages[Index] = action.payload;
      }
    },
    deleteLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (d) => d.id !== action.payload
      );
    },
    addVolunteering: (state, action: PayloadAction<VolunteeringData>) => {
      state.volunteering.push(action.payload);
    },
    updateVolunteering: (state, action: PayloadAction<VolunteeringData>) => {
      const Index = state.volunteering.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.volunteering[Index] = action.payload;
      }
    },
    deleteVolunteering: (state, action: PayloadAction<string>) => {
      state.volunteering = state.volunteering.filter(
        (d) => d.id !== action.payload
      );
    },
    addPublication: (state, action: PayloadAction<PublicationData>) => {
      state.publication.push(action.payload);
    },
    updatePublication: (state, action: PayloadAction<PublicationData>) => {
      const Index = state.publication.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.publication[Index] = action.payload;
      }
    },
    deletePublication: (state, action: PayloadAction<string>) => {
      state.publication = state.publication.filter(
        (d) => d.id !== action.payload
      );
    },
    addCustom: (state, action: PayloadAction<CustomData>) => {
      state.custom.push(action.payload);
    },
    updateCustom: (state, action: PayloadAction<CustomData>) => {
      const Index = state.custom.findIndex(
        (d) => d.id === action.payload.id
      );
      if (Index !== -1) {
        state.custom[Index] = action.payload;
      }
    },
    deleteCustom: (state, action: PayloadAction<string>) => {
      state.custom = state.custom.filter(
        (d) => d.id !== action.payload
      );
    },
    addCustomPageData: (state, action: PayloadAction<CustomPageData>) => {
      state.customPageData.push(action.payload);
    },
    updateCustomPageData: (state, action: PayloadAction<CustomPageData>) => {
      const Index = state.customPageData.findIndex(
        (d) => d.id === action.payload.id 
      );
      if (Index !== -1) {
        state.customPageData[Index] = action.payload;
      }
    },
    deleteCustomPageData: (state, action: PayloadAction<string>) => {
      state.customPageData = state.customPageData.filter(
        (d) => d.id !== action.payload
      );
    },
  },
});

export const {
  addResumeHeading,
  addSkills,
  removeSkills,
  addExperience,
  deleteExperience,
  updateExperience,
  addProjects,
  deleteProjects,
  updateProjects,
  addEducaiton,
  updateEducation,
  deleteEducation,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  addStrength,
  updateStrength,
  deleteStrength,
  addAward,
  updateAward,
  deleteAward,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  addHobby,
  updateHobby,
  deleteHobby,
  addtrainingandcourse,
  updatetrainingandcourse,
  deletetrainingandcourses,
  addSummary,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  addVolunteering,
  updateVolunteering,
  deleteVolunteering,
  addPublication,
  updatePublication,
  deletePublication,
  addCustom,
  updateCustom,
  deleteCustom,
  addCustomPageData,
  updateCustomPageData,
  deleteCustomPageData
} = resumeSlice.actions;
export default resumeSlice.reducer;
