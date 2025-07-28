"use client"
import { ChangeEvent } from "react";

interface InputRangeProps {
  value: number;
  onChange:(value:number)=>void;
  title: string;
  label: string;
}

type FontSizeKeys = 1 | 2 | 3 | 4 | 5; 
const fontObject:Record<FontSizeKeys ,string> = {
    1 :"Extra Small",
    2 : "Small",
    3 : "Medium",
    4 : "Large",
    5 : "Extra Large"
}
export default function InputRange({
  value,
  onChange,
  title,
  label,
}: InputRangeProps) {
    const MaxValue = label === "height" ? 3 : 5;
    const handleDecrease = ()=>{
      if(value > 1) onChange(value - 1);
    }
    const handleIncrease = ()=>{
      if(value < MaxValue) onChange(value + 1);
    }
    const handleSliderchange = (e:ChangeEvent<HTMLInputElement>)=>{
      onChange(Number(e.target.value));
    }
  return (
    <div>
      <label htmlFor={label}>
        {title} :
        {label === "font" ? fontObject[value as FontSizeKeys]  : value}
      </label> 
      <div className="flex space-x-2">
        <button
          type="button"
          className="text-4xl  rounded-md disabled:opacity-50 -translate-y-2.5 "
          onClick={handleDecrease}
          disabled={value <= 1}
        >
          -
        </button>
        <div className="relative w-52 ">
          <input
            type="range"
            name={label}
            id={label}
            min={1}
            max={MaxValue}
            value={value}
            onChange={handleSliderchange}
            className="bg-neutral-700 rounded-2xl h-2 w-full appearance-none cursor-pointer z-10 relative
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:w-[10px] 
                 [&::-webkit-slider-thumb]:rounded-full
               [&::-webkit-slider-thumb]:bg-green-400
               [&::-webkit-slider-thumb]:border-4
               [&::-webkit-slider-thumb]:border-green-700
               [&::-webkit-slider-thumb]:shadow-md 
                [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-blue-500"
          />
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between z-0 items-center pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div className="w-0.5 h-4 bg-white z-0" key={i} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="text-2xl -translate-y-2  rounded-md disabled:opacity-50"
          onClick={handleIncrease}
          disabled={value >= MaxValue}
        >
          +
        </button>
      </div>
    </div>
  );
}
