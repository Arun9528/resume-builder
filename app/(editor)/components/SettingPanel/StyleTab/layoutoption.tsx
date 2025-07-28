"use client"
import { RootState } from "@/store";
import { setLayout } from "@/store/slices/styleSlice";
import { useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutOption() {
  const { layoutClass, reverse } = useSelector((state: RootState) => state.style.layout);
  const dispatch = useDispatch();
  useEffect(()=>{
    const savedLayout = sessionStorage.getItem("layoutStyle");
   if(savedLayout){
        const { layoutClass: savedClass, reverse: savedReverse } = JSON.parse(savedLayout);
      dispatch(setLayout({ layoutClass: savedClass, reverse: savedReverse }));
   }
  },[dispatch]);
   const selectIndex = useMemo(() => {
    if (layoutClass.startsWith("column_layout_")) {
      const n = parseInt(layoutClass.replace("column_layout_", ""), 10);
      return isNaN(n) ? null : n - 1;
    } 
    else if (layoutClass.startsWith("reverse_column_layout_")) {
      const n = parseInt(layoutClass.replace("reverse_column_layout_", ""), 10);
      return isNaN(n) ? null : n - 1;
    } 
    return null;
  }, [layoutClass]);

  const applyLayout = (i: number | null) => {
    if (i === null) {
      dispatch(
        setLayout({
          // editlayout: false,
          layoutClass: "",
          reverse: false,
          // fullwidth: false,
        })
      );
    } else if (i >= 0 && i <= 4) {
      const selectIndexValue = reverse
        ? `reverse_column_layout_${i + 1}`
        : `column_layout_${i + 1}`;
      dispatch(
        setLayout({
          // editlayout: true,
          layoutClass: selectIndexValue,
          reverse,
          // fullwidth: false,
          
        })
      );
    }
  };
  const handleReverse = () => {
    if (selectIndex === null) return;
    const newReverse = !reverse;
    const newLayoutClass = newReverse ? `reverse_column_layout_${selectIndex + 1}` : `column_layout_${selectIndex + 1}`;
    dispatch(
      setLayout({
        layoutClass: newLayoutClass,
        reverse: newReverse,
        // editlayout: true,
        // fullwidth: false,
      })
    );
  };
  useEffect(()=>{
    sessionStorage.setItem("layoutStyle",JSON.stringify({reverse,layoutClass}))
  },[reverse,layoutClass])
  return (
    <div className="w-full">
      <h2 className="text-lg">Layout</h2>
      <div className="flex gap-x-2 py-2 items-center">
        <label htmlFor="original">Original Layout</label>
        <input
          type="radio"
          name="Original"
          id="original"
          checked={selectIndex === null}
          onChange={() => applyLayout(null)}
          className="size-4"
        />
        <button
        type="button"
        className={`px-2 py-1 ms-10 rounded-md mb-2 ${
          selectIndex === null
            ? "bg-gray-500 cursor-not-allowed text-gray-400"
            : " bg-red-500 text-white cursor-pointer"
        }`}
        onClick={handleReverse}
        disabled={selectIndex === null}
      >
        {reverse ? "Reversed" : "Normal"}
      </button>
      </div>
      

      <div className="flex flex-wrap gap-x-8 text-[13px] font-medium">
        {[...Array(5)].map((_, i) => {
          const isSelected = selectIndex === i;
          return (
            <div key={i} className="text-center">
              <div
                className={`size-16 border rounded-sm gap-x-1 overflow-hidden cursor-pointer flex ${
                  isSelected
                    ? "border-teal-600  border-2"
                    : "border-zinc-500 hover:border-teal-600 hover:border-2 group"
                }`}
                onClick={() => applyLayout(i)}
              >
                    <div
                      className={` h-full ${
                        reverse
                          ? ` ${
                              isSelected
                                ? "bg-teal-600"
                                : `group-hover:bg-teal-500 bg-gray-400/50`
                            }`
                          : `bg-gray-200`
                      }`}
                      style={
                        reverse
                          ? { flex: 1 }
                          : { width: `${75 - (i + 1) * 10}%` }
                      }
                    ></div>
                    <div
                      className={`h-full ${
                        reverse
                          ? `bg-gray-200`
                          : ` ${
                              isSelected
                                ? "bg-teal-600"
                                : "group-hover:bg-teal-500 bg-gray-400/50"
                            }`
                      }`}
                      style={
                        reverse
                          ? { width: `${75 - (i + 1) * 10}%` }
                          : { flex: 1 }
                      }
                    ></div>
              </div>
              <p>{`Column ${i + 1}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
