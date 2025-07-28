"use client"
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({children}:{children:React.ReactNode}){
  const [portalElement,setPortalElement] = useState<HTMLElement | null>(null);
  useEffect(()=>{
    const element = document.getElementById("modal-portal");
    if(element) setPortalElement(element);
  },[]);
  if(!portalElement) return null
  return createPortal(children,portalElement);
}