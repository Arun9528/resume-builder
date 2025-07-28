import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setFontStyle } from "@/store/slices/styleSlice";
import { RootState } from "@/store";
  const fontOptions = [
    { value: 'var(--font-rubik)', label: 'Rubik' },
    { value: 'var(--font-arimo)', label: 'Arimo' },
    { value: 'var(--font-lato)', label: 'Lato' },
    { value: 'var(--font-raleway)', label: 'Raleway' },
    { value: 'var(--font-bitter)', label: 'Bitter' },
    { value: 'var(--font-exo2)', label: 'Exo 2' },
    { value: 'var(--font-chivo)', label: 'Chivo' },
    { value: 'var(--font-tinos)', label: 'Tinos' },
    { value: 'var(--font-montserrat)', label: 'Montserrat' },
    { value: 'var(--font-oswald)', label: 'Oswald' },
    { value: 'var(--font-volkhov)', label: 'Volkhov' },
    { value: 'var(--font-gelasio)', label: 'Gelasio' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: '"Times New Roman", serif', label: 'Times New Roman' },
    { value: 'Georgia, serif', label: 'Georgia' }
  ];
export default function FontSelector(){
  const fontStyletype = useSelector((state:RootState)=> state.style.fontStyle);
  const [Selectfont, setSelectFont] = useState<string>(()=>{
    const saved = sessionStorage.getItem("fontStyle");
    return saved ? JSON.parse(saved) : fontStyletype;
  });
  const dispatch = useDispatch()
  useEffect(()=>{
    const fontStyle = fontOptions.find((f)=>f.value === Selectfont);
    if(fontStyle){
        dispatch(setFontStyle(fontStyle.value))
        sessionStorage.setItem("fontStyle",JSON.stringify(fontStyle.value))
    }
  },[Selectfont,dispatch]);
    return(
      <div className="w-full">
        <p>Font Style</p>
         <select onChange={(e:ChangeEvent<HTMLSelectElement>)=> setSelectFont(e.target.value)} value={Selectfont} className="border rounded-sm w-full px-2 mt-1 outline-0">
            {
              fontOptions.map((option,i)=>(
                <option key={i} value={option.value}> {option.label}</option>
              ))
            }
         </select>
      </div>
    )
}