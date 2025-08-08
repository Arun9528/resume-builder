"use client";
import { PathState } from "@/types/type";
import { useRouter } from "next/navigation";
interface FormNavigationProps extends PathState {
  onNext?: () => void;
}
export default function FormNavigation({
  prevPath,
  nextPath,
  firstPart,
  onNext,
}: FormNavigationProps) {
  const router = useRouter();
  const previousPath = prevPath === "/" ? "/" : `/${firstPart}${prevPath}`;
  const linkbtnstyle = "text-black font-semibold sm:text-lg underline-offset-4 rounded-md cursor-pointer transition-all hover:underline";
  const handleBackroute = ()=>{
    router.push(previousPath)
  }
  return (
    <div
      className={`flex justify-between  pt-1 ${prevPath === "/heading" ? "" : "w-full"}`}
    >
      {prevPath && (
        <button type="button" className={linkbtnstyle} onClick={handleBackroute} >
          Back
        </button>
      )}
      {nextPath && (
        <button
          type={prevPath === "/" ? "submit" : "button"}
          className={linkbtnstyle}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
