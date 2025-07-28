"use client";
import { FaSun } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function DarkMode() {
  const [isDarkmode, setIsdarkMode] = useState<boolean>(false);
 const skipLoading = useRef<boolean>(true);
  useEffect(()=>{
        const getDarkModeValue = localStorage.getItem("DarkMode");
        if(getDarkModeValue){
                const isDark = JSON.parse(getDarkModeValue)
                document.documentElement.classList.toggle("dark",isDark);
                setIsdarkMode(isDark);
        }
  },[])
  useEffect(() => {
    if(skipLoading.current) {
        skipLoading.current = false;
        return;
    }
    document.documentElement.classList.toggle("dark",isDarkmode);
    localStorage.setItem("DarkMode",JSON.stringify(isDarkmode));
  }, [isDarkmode,skipLoading]);
  const handleDarkmode = () =>{
    setIsdarkMode((prev) => !prev);
  }
  return (
    <>
      {isDarkmode ? (
        <IoMoon className="cursor-pointer" title="Dark Mode" onClick={handleDarkmode} />
      ) : (
        <FaSun className="cursor-pointer " title="Light Mode" onClick={handleDarkmode} />
      )}
    </>
  );
}
