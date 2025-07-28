import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CustomLayoutData from "./customlayoutdata";
export default function CustomPreviewLayout() {
  const customlayout = useSelector((state: RootState) => state.style.addSection.customlayout);
  return (
    <div>
      <h2 className="font-bold text-lg break-words whitespace-normal max-w-full ">
        {customlayout?.maintitle || "Custom Title"}
      </h2>
      <div style={{ border: "1.5px solid black" }}></div>
      <div className={`grid ${customlayout?.layout === "normal" ? "grid-cols-1" : "grid-cols-2 gap-x-3.5"}`}>
       <CustomLayoutData customlayout={customlayout}/>
        {
          customlayout?.layout === "double" && (<CustomLayoutData customlayout={customlayout}/>)
        }
      </div>
    </div>
  );
}
