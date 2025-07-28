"use client"
import React, { JSX} from "react";

interface AllSectionValueProps<T extends {id:string,maintitle?:string}> {
  title: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  isEdit: boolean;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isClient:boolean
  isCustomPageData:boolean;
}
export default function AllSectionValue<T extends {id:string,maintitle?:string}>({
  title,
  items,
  renderItem,
  onEdit,
  onDelete,
  isEdit = false,
  isClient,
  isCustomPageData,
}: AllSectionValueProps<T>):JSX.Element{
  const MainRender = isCustomPageData ? items.filter(d=> d?.maintitle?.toLowerCase()?.trim() === title.toLowerCase()) : items
  return (
    <div className="mt-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      {isClient && (MainRender?.length > 0 ? (
        MainRender?.map((item) => (
          <div key={item?.id}>
            <div className="text-end space-x-5">
              <button
                type="button"
                className="text-green-600 cursor-pointer"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                type="button"
                className={` ms-8 ${
                  isEdit
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-600 cursor-pointer"
                }`}
                onClick={() => {
                    if(!isEdit) onDelete(item);
                }}
                disabled={isEdit}
              >
                Delete
              </button>
            </div>
            {renderItem(item)}
          </div>
        ))
      ) : (
        <p className="font-medium text-gray-500">{title} not Added Yet.</p>
      ))}
    </div>
  );
}
