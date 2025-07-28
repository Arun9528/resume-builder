import { initialSection } from "@/app/(editor)/components/SettingPanel/StyleTab/rearrange";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface fontSizetypes {
  mainheading: string;
  heading: string;
  mainpara: string;
  para: string;
}
export interface tempaltetypes {
  first: string[];
  second: string[];
  other: string[];
}

export interface customtypes {
  maintitle: string;
  title: boolean;
  subtitle: boolean;
  // descriptionType: "normal" | "circle";
  // nodescription:boolean;
  normaldesciption:boolean;
  listdescription:boolean;
  withdate:boolean;
  withoutdate:boolean;
  startEnddate: boolean;
  location: boolean;
  link: boolean;
  layout:"normal" | "double"
}
interface StyleState {
  fontSize: fontSizetypes;
  lineHeight: number;
  spacing: string;
  spacingNumber:number;
  padding: string;
  fontColor: {
    inner: string;
    outer: string;
  };
  fontStyle: string;
  layout: {
    editlayout?: boolean;
    layoutClass: string;
    reverse?: boolean;
    // fullwidth?: boolean;
  };
  addSection: {
    isShow: boolean;
    customsection?: boolean;
    customlayout?: customtypes;
    customlayoutData: customtypes[];
    unusedsection?: string[];
    template1: tempaltetypes;
    template2:tempaltetypes;
    template3:tempaltetypes
  };
  isDragActive:boolean;
  // DragItems:Omit<tempaltetypes,"other">
  DragDefault:initialSection;
  isModalOpen:boolean;
  templateChange:boolean;
  resumeData:HTMLDivElement | null;
}
const initialState: StyleState = {
  fontSize: {
    mainheading: "22px",
    heading: "20px",
    mainpara: "16px",
    para: "14.5px",
  },
  lineHeight: 1.1,
  spacing: "8px",
  spacingNumber:1,
  padding: "16px",
  fontColor: {
    inner: "#060606",
    outer: "#000000",
  },
  fontStyle: "var(--font-rubik)",
  layout: {
    editlayout: false,
    layoutClass: "",
    reverse: false,
    // fullwidth: false,
  },
  addSection: {
    isShow: false,
    unusedsection: [
      "custom",
      "volunteering",
      "certification",
      "awards",
      "publication",
      "training / courses",
      "hobbies",
      "languages",
      "summary",
    ],
    template1: {
      first: ["skills", "experience"],
      second: ["projects", "education", "achievements", "strengths"],
      other: [],
    },
    template2:{
      first: ["skills", "experience","projects"],
      second: ["summary","education", "achievements", "strengths"],
      other: [],
    },
    template3 :{
      first:["skills", "experience","projects","education","achievements","strengths"],
      second:[],
      other:[],
    },
    customsection: false,
    customlayout: {
      maintitle: "",
      title: true,
      subtitle: true,
      withdate:false,
      withoutdate:false,
      startEnddate: false,
      location: false,
      link: false,
      // nodescription:true,
      normaldesciption:true,
      listdescription:false,
      layout:"normal"
    },
    customlayoutData: [],
  },
   isDragActive:false,
  //  DragItems:{
  //   first:[],
  //   second:[]
  //  },
   DragDefault:{
    first:[],
    secondLeft:[],
    secondRight:[],
    secondAll:[]
   },
   isModalOpen:true,
   templateChange:false,
   resumeData:null
};
const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<fontSizetypes>) => {
      state.fontSize = action.payload;
    },
    setlineHeight: (state, action: PayloadAction<number>) => {
      state.lineHeight = action.payload;
    },
    setSpacing: (state, action: PayloadAction<string>) => {
      state.spacing = action.payload;
    },
     setSpacingNumber: (state, action: PayloadAction<number>) => {
      state.spacingNumber = action.payload;
    },
    setPadding: (state, action: PayloadAction<string>) => {
      state.padding = action.payload;
    },
    setFontColor: (
      state,
      action: PayloadAction<{ inner: string; outer: string }>
    ) => {
      state.fontColor = action.payload;
    },
    setFontStyle: (state, action: PayloadAction<string>) => {
      state.fontStyle = action.payload;
    },
    setLayout: (
      state,
      action: PayloadAction<{
        editlayout?: boolean;
        layoutClass: string;
        reverse?: boolean;
        // fullwidth?: boolean;
      }>
    ) => {
      state.layout = action.payload;
    },
    setAddSection: (
      state,
      action: PayloadAction<{
        isShow: boolean;
        unusedsection?: string[];
        template1?: tempaltetypes;
        template2?: tempaltetypes;
        template3? :tempaltetypes;
        customsection?: boolean;
        tempalteUsedName?:string
      }>
    ) => {
      const { isShow, unusedsection,template1,template2,template3, customsection,tempalteUsedName} =
        action.payload;
      state.addSection.isShow = isShow;
      state.addSection.customsection = customsection;
      // if( unusedsection !== undefined ){
      //     if(unusedsection.length > 1){
      //         state.addSection.unusedsection = unusedsection
      //     }else{
      //         state.addSection.unusedsection = [...(state.addSection.unusedsection ?? []),...unusedsection]
      //     }
      // }
      //    if(template1 !== undefined  ){
      //     if(template1.length > 1){
      //         state.addSection.template1 = template1
      //     }else{
      //       state.addSection.template1 = [...(state.addSection.template1 ?? []),...template1]
      //     }
      //    }
      if (unusedsection !== undefined) {
        state.addSection.unusedsection = unusedsection;
      }
      if (template1 !== undefined && tempalteUsedName === "template1") {
        state.addSection.template1 = template1;
      }
      if (template2 !== undefined && tempalteUsedName === "template2") {
        state.addSection.template2 = template2;
      }
      if (template3 !== undefined && tempalteUsedName === "template3") {
        state.addSection.template3 = template3;
      }
      
    },

    setCustomlayout: (state, action: PayloadAction<customtypes>) => {
      state.addSection.customlayout = action.payload;
    },
    setCustomlayoutData: (state, action: PayloadAction<customtypes>) => {
      state.addSection.customlayoutData.push(action.payload);
    },
    // setIsDragActive:(state,action:PayloadAction<boolean>)=>{
    //    state.isDragActive = action.payload;
    // },
    // setDragItems:(state,action:PayloadAction<Omit<tempaltetypes,"other">>)=>{
    //   state.DragItems = action.payload
    // },
    setDragDefault:(state,action:PayloadAction<initialSection>)=>{
      state.DragDefault = action.payload
    },
    setIsModal:(state,action:PayloadAction<boolean>)=>{
      state.isModalOpen = action.payload
    },
    setTemplateChange:(state,action:PayloadAction<boolean>)=>{
      state.templateChange = action.payload;
    },
     setIsDragActive:(state,action:PayloadAction<boolean>)=>{
      state.isDragActive = action.payload;
    }

    // setResumeData:(state,action:PayloadAction<HTMLDivElement | null>)=>{
    //   state.resumeData = action.payload;
    // }
  },
});
export const {
  setFontSize,
  setlineHeight,
  setSpacing,
  setPadding,
  setFontColor,
  setFontStyle,
  setLayout,
  setAddSection,
  setCustomlayoutData,
  setCustomlayout,
  setDragDefault,setIsModal,setTemplateChange,setSpacingNumber,setIsDragActive
} = styleSlice.actions;
export default styleSlice.reducer;
