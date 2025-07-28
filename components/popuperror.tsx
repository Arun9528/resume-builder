"use client"
import { RootState } from "@/store"
import {motion } from "motion/react";
import { useSelector } from "react-redux"

export default function PopupError(){
const {message} = useSelector((state:RootState)=> state.error);
    return (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 10, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, stiffness: 300, type: "spring" }}
          className="fixed top-8 left-1/2 -translate-x-1/2 rounded-md py-2 bg-red-600 px-3 z-50 shadow-lg text-white"
        >
         {message}
        </motion.div>
    )
}