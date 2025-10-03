// "use client"
import ColorCircle from "@/components/colorcircle";
import { HexAlphaColorPicker } from "react-colorful";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import tinycolor from "tinycolor2";
import { useCallback, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { setFontColor } from "@/store/slices/styleSlice";

export interface ColorPair {
  inner: string;
  outer: string;
}

export const colorPairs: ColorPair[] = [
  { inner:"#060606", outer:"#000000"},
  { inner: "#1E90FF", outer: "#000000" },
  { inner: "#6F7878", outer: "#000000" },
  { inner: "#3CB371", outer: "#124F44" },
  { inner: "#F96B07", outer: "#8A0202" },
  { inner: "#56ACF2", outer: "#002B7F" },
  { inner: "#3C6DF0", outer: "#19273C" },
  { inner: "#F96B07", outer: "#002B7F" },
  { inner: "#951DC4", outer: "#501E58" },
  { inner: "#00B6CB", outer: "#343334" },
  { inner: "#C4881C", outer: "#19273C" },
  { inner: "#1E3A8A", outer: "#E0E7FF" },
  { inner: "#2C3E50", outer: "#F5CBA7" },
  { inner: "#046307", outer: "#D4EFDF" },
  { inner: "#7B241C", outer: "#FDEDEC" },
  { inner: "#1C2833", outer: "#FCF3CF" },
  { inner: "#145A32", outer: "#F9E79F" },
];
export default function ColorPicker(){
    const dispatch = useDispatch();
    const [selectIndex, setSelectIndex] = useState<number | null>(null);
    const [ShowCustomcolor, setShowCustomcolor] = useState<boolean>(false);
    const [isPrimaryActive, setIsPrimaryActive] = useState<boolean>(true);
    const [dynamicColorPairs, setDynamicColorPairs] =useState<ColorPair[]>(()=>{
      const saved = sessionStorage.getItem("ResumeColorPairs");
      return saved ? JSON.parse(saved) : colorPairs;
    });
    const [colors, setColors] = useState<{
      primaryColor: string;
      secondaryColor: string;
    }>(()=>{
      const saved = sessionStorage.getItem("Resumecolor");
      return saved ? JSON.parse(saved) : { primaryColor: colorPairs[0].outer, secondaryColor: colorPairs[0].inner };
    });
    const [textValue, setTextValue] = useState<string>("");
    const [showHex, setShowHex] = useState<boolean>(true);
    useEffect(()=>{
      sessionStorage.setItem("ResumeColorPairs",JSON.stringify(dynamicColorPairs));
    },[dynamicColorPairs]);
    useEffect(()=>{
      const time = setTimeout(()=>{
        sessionStorage.setItem("Resumecolor", JSON.stringify(colors));
      },200);
      return ()=> clearTimeout(time)
    },[colors]);
    useEffect(() => {
      const index = dynamicColorPairs.findIndex(pair => pair.outer === colors.primaryColor && pair.inner === colors.secondaryColor);
      setSelectIndex(index !== -1 ? index : null);
      if(index){
        const pairscolor = dynamicColorPairs[index];
        dispatch(setFontColor(pairscolor))
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(()=>{
      const hex = isPrimaryActive ? colors.primaryColor : colors.secondaryColor;
      if(showHex){
        setTextValue(hex);
      }else{
        const {r,g,b,a} = tinycolor(hex).toRgb();
        setTextValue(`(${r}, ${g}, ${b}, ${a.toFixed(2)})`);
      }
    },[colors,isPrimaryActive,showHex]);
  
    const handleTextChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setTextValue(value);
        const tc = tinycolor(value);
        if(tc.isValid()){
          const hex = tc.toHex8String();
          const key = isPrimaryActive ? "primaryColor" : "secondaryColor";
          setColors(prev=>  prev[key] !== hex ? { ...prev, [key]: hex } : prev);
        }
    },[isPrimaryActive])
  
    const handlePickerChange = useCallback(
      (newHex: string) => {
        const key = isPrimaryActive ? "primaryColor" : "secondaryColor";
        setColors((prev) =>
          prev[key] !== newHex ? { ...prev, [key]: newHex } : prev
        );
      },
      [isPrimaryActive]
    );
  
    const handleSelectPreset = (i: number) => {
      const pair = dynamicColorPairs[i];
      if(pair.outer === pair.inner) return;
      setSelectIndex(i);
      setColors({
        primaryColor: pair.outer,
        secondaryColor: pair.inner,
      });
      dispatch(setFontColor(pair));
    }
   useEffect(()=>{
      sessionStorage.setItem("Resumecolor",JSON.stringify(colors))
   },[colors])
    const handleSavePair = () => {
  
      if(colors.primaryColor === colors.secondaryColor){
        alert("Inner and outer colors cannot be identical!");
        return;
      }
      const exits = dynamicColorPairs.some(pair=> pair.outer === colors.primaryColor && pair.inner === colors.secondaryColor);
      if(exits){
        alert("This color combination already exists!");
        return;
      }
      const pair: ColorPair = {
        outer: colors.primaryColor,
        inner: colors.secondaryColor,
      };
      dispatch(setFontColor(pair));
      setDynamicColorPairs((prev) => {
        const updated = [...prev, pair];
        setSelectIndex(updated.length - 1);
        return updated;
      });
      setShowCustomcolor(false);
    }
    
     return (
        <div className="py-4">
        <p>Colors</p>
        <div className="flex flex-wrap gap-6 p-4">
          {dynamicColorPairs.map((p, i) =>(
              <div
                key={i}
                onClick={() => handleSelectPreset(i)}
                role="button"
                tabIndex={0}
                className="relative cursor-pointer"
                aria-label={`Select color pair ${i + 1}`}
              >
                <ColorCircle key={i} inner={p.inner} outer={p.outer} />
                {selectIndex === i && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaCheck className="text-white text-lg" />
                  </div>
                )}
              </div>
            ))}

        </div>
        {!ShowCustomcolor && (
          <button
            type="button"
            className="text-[#5D5292] font-semibold cursor-pointer"
            onClick={() => setShowCustomcolor(true)}
          >
            Use Custom Color
          </button>
        )}
        {ShowCustomcolor && (
          <div className="p-5 bg-gray-300 space-y-1">
            <div className="flex justify-between items-center">
              <p className="font-medium">Custom Color Picker</p>
              <IoClose onClick={() => setShowCustomcolor(false)} />
            </div>
            <div className="grid grid-cols-2 bg-gray-400/40 p-1 rounded-md ">
              <p
                className={`${
                  isPrimaryActive ? "bg-white text-teal-700" : "text-gray-600"
                } cursor-pointer text-center py-2 font-medium rounded-md`}
                onClick={() => setIsPrimaryActive(true)}
              >
                Primary
              </p>
              <p
                className={`${
                  !isPrimaryActive ? "bg-white text-teal-700" : "text-gray-600"
                } cursor-pointer text-center py-2 font-medium rounded-md`}
                onClick={() => setIsPrimaryActive(false)}
              >
                Secondary
              </p>
            </div>
            <div className="colorpickers">
              <HexAlphaColorPicker color={isPrimaryActive ? colors.primaryColor : colors.secondaryColor} onChange={handlePickerChange} />
              <div className="mt-4 flex rounded-md">
                  <div className="flex bg-gray-200 border border-gray-400">
                      <button className={`px-2 py-1 rounded ${
                  showHex ? "bg-white text-teal-700" : "bg-gray-300"
                }`} onClick={()=>  setShowHex(true)}>HEX</button>
                      <button className={` px-2 py-1 rounded ${
                  !showHex ? "bg-white text-teal-700" : "bg-gray-300"
                } `} onClick={()=>setShowHex(false)} >RGBA</button>
                  </div>
                  <input type="text" 
                className="w-full outline-0 ps-2 border-y border-y-gray-400 border-r border-r-gray-400  text-center"
                  value=  {textValue}
                  onChange={handleTextChange}
              />
              </div>
            </div>
            <button
              type="button"
              className="w-full py-2 bg-green-600 text-white rounded-lg cursor-pointer mt-3"
              onClick={handleSavePair}
            >
              Save
            </button>
          </div>
        )}
      </div>
     )
}