"use client"
import { RootState } from "@/store";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dragitem from "../dragitem";
import { FaLock } from "react-icons/fa6";
import {
  setAddSection,
  setDragDefault,
} from "@/store/slices/styleSlice";
import { usePathname } from "next/navigation";
import SaveDragData from "@/utils/saveDragData";
export interface initialSection {
  first: string[];
  secondLeft: string[];
  secondRight: string[];
  secondAll: string[];
}
interface DroppableProps {
  id: string;
  children: React.ReactNode;
  isEmpty: boolean;
}
const DroppableContainer = ({ id, children, isEmpty }: DroppableProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { isDroppableContainer: true },
  });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-10 rounded-sm ${
        isOver && "bg-blue-50 border border-blue-200"
      } ${isEmpty && "border-2 border-dashed rounded"}`}
    >
      {children}
    </div>
  );
};
export default function Rearrange() {
  const AddSections = useSelector((state: RootState) => state.style.addSection);
  const { layoutClass, reverse } = useSelector((state: RootState) => state.style.layout);
  const paths = usePathname();
  const templateName = paths.split("/")[1];
  const isTemplate1 = paths.includes("template1");
  const isTemplate2 = paths.includes("template2");
  const templates = AddSections[templateName as "template1" | "template2" | "template3"];
  const dispatch = useDispatch();
  const [dragContents, setDragContents] = useState<initialSection>(()=>{
    const stored = sessionStorage.getItem("dragContents");
    return stored ? SaveDragData(templates,stored,templateName) : {first: [],secondLeft: [],secondRight: [],secondAll: []}
  });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));
  useEffect(() => {
    const removeCustom = (arr: string[]) => arr.map((d) => d.replaceAll(" (custom)", "").trim()).filter(Boolean);
    const hasAny = [dragContents.first,dragContents.secondAll,dragContents.secondLeft,dragContents.secondRight,]
    .some(arr => arr.length > 0);
    if(hasAny) {
      return;
    }
      const  removeFirst = removeCustom(templates.first);
      const  removeSecond = removeCustom(templates.second);
    if (isTemplate1) {
      const secondLeft = removeSecond!.filter((_, i) => i % 2 === 0);
      const secondRight = removeSecond!.filter((_, i) => i % 2 === 1);
      setDragContents({
        first: removeFirst!,
        secondLeft,
        secondRight,
        secondAll: [],
      });
    } else if(isTemplate2) {
    const reverseFirst = reverse ? removeSecond : removeFirst;
    const reverseSecond = reverse ? removeFirst : removeSecond;
      setDragContents({
        first: reverseFirst,
        secondLeft: [],
        secondRight: [],
        secondAll: reverseSecond ,
      });
    }else{
      setDragContents({
        first:removeFirst,
        secondLeft:[],
        secondRight:[],
        secondAll:[]
      })
    }
  }, [templates.first,templates.second,reverse,isTemplate1,isTemplate2]);
  const handleDeleteItem = (id: string, containerId: keyof initialSection) => {
    const Filterfirst = templates.first?.filter((d) => d !== id);
    const FilterSecond = templates.second?.filter((d) => d !== id);
    const addDatainUnusedsection = [...(AddSections?.unusedsection ?? []),id];
    dispatch(
      setAddSection({
        isShow: false,
        [templateName]: {
          first: Filterfirst,
          second: FilterSecond,
          other: templates.other,
        },
        tempalteUsedName: templateName,
        unusedsection:addDatainUnusedsection
      })
    );
    setDragContents((prev) => ({
      ...prev,
      [containerId]: prev[containerId].filter((item) => item !== id),
    }));
    sessionStorage.setItem("templateIdData",JSON.stringify({first:Filterfirst,second:FilterSecond,other:templates.other}));
    sessionStorage.setItem("unusedsectionData",JSON.stringify(addDatainUnusedsection));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const activeContainer = dragContents.first.includes(active.id as string)
      ? "first"
      : dragContents.secondLeft.includes(active.id as string)
      ? "secondLeft"
      : dragContents.secondRight.includes(active.id as string)
      ? "secondRight"
      : dragContents.secondAll.includes(active.id as string)
      ? "secondAll"
      : null;
    let overContainer: keyof initialSection | null = null;
    if (over.data?.current?.isDroppableContainer) {
      overContainer = over.id as keyof initialSection;
    } else if (over.data?.current?.containerId) {
      overContainer = over.data.current.containerId as keyof initialSection;
    } else {
      overContainer = dragContents.first.includes(over.id as string)
        ? "first"
        : dragContents.secondLeft.includes(over.id as string)
        ? "secondLeft"
        : dragContents.secondRight.includes(over.id as string)
        ? "secondRight"
        : dragContents.secondAll.includes(over.id as string)
        ? "secondAll"
        : null;
    }
    if (!activeContainer || !overContainer) return;
   
    setDragContents((prev) => {
      const activeItems = [...prev[activeContainer]];
      const overItems = [...prev[overContainer]];

      const activeIndex = activeItems.findIndex((item) => item === active.id);
      if (activeIndex === -1) return prev;
      let overIndex = overItems.length;

      if (!over.data?.current?.isDroppableContainer) {
        const overItemIndex = overItems.findIndex((item) => item === over.id);
        if (overItemIndex !== -1) {
          overIndex = overItemIndex;
        }
      }
      let newDragContents;
      if (activeContainer === overContainer) {
        newDragContents = {
          ...prev,
          [activeContainer]: arrayMove(activeItems, activeIndex, overIndex),
        };
      } else {
        const [movedItem] = activeItems.splice(activeIndex, 1);
        overItems.splice(overIndex, 0, movedItem);
        newDragContents = {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      }
      return newDragContents;
    });
  };
  useEffect(() => {
    sessionStorage.setItem("dragContents",JSON.stringify(dragContents));
    dispatch(setDragDefault(dragContents));
    const secondData = dragContents.secondAll.length > 0 ? dragContents.secondAll : 
    [...dragContents.secondLeft,...dragContents.secondRight]
    dispatch(setAddSection({isShow: false,
      [templateName]: {first: dragContents.first,second: secondData,other: templates.other},tempalteUsedName: templateName}));
  }, [dragContents, dispatch,templateName,templates.other]);

  return (
    <div className="p-4 bg-gray-100 flex flex-col gap-y-2 rounded-md w-full border mt-5">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="relative cursor-not-allowed ">
          <FaLock className="absolute left-2 top-3" />
          <p className="capitalize border px-3 py-2 rounded-sm text-center">
            Heading
          </p>
        </div>
        {isTemplate1 && (
          <DroppableContainer
            id="first"
            isEmpty={dragContents.first.length === 0}
          >
            <div className="flex flex-col gap-2 justify-center">
              <SortableContext
                items={dragContents.first}
                strategy={verticalListSortingStrategy}
              >
                {dragContents.first.length > 0 ?(
                    dragContents.first?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="first"
                        onDelete={handleDeleteItem}
                      />
                    )))
                 : (
                  <p className="text-center py-1 opacity-55">Empty</p>
                )}
              </SortableContext>
            </div>
          </DroppableContainer>
        )}
        {isTemplate1 &&(
          <div className="grid grid-cols-2 gap-2">
            <DroppableContainer
              id="secondLeft"
              isEmpty={dragContents.secondLeft.length === 0}
            >
              <div
                className={`flex flex-col gap-2 h-full ${
                  dragContents.secondLeft.length === 0 && "justify-center"
                }`}
              >
                <SortableContext
                  items={dragContents.secondLeft}
                  strategy={verticalListSortingStrategy}
                >
                  {dragContents.secondLeft.length > 0 ? (
                    dragContents.secondLeft?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="secondLeft"
                        onDelete={handleDeleteItem}
                      />
                    ))
                  ) : (
                    <p className="text-center py-1 opacity-55">Empty</p>
                  )}
                </SortableContext>
              </div>
            </DroppableContainer>
            <DroppableContainer
              id="secondRight"
              isEmpty={dragContents.secondRight.length === 0}
            >
              <div
                className={`flex flex-col gap-2 h-full ${
                  dragContents.secondRight.length === 0 && "justify-center"
                }`}
              >
                <SortableContext
                  items={dragContents.secondRight}
                  strategy={verticalListSortingStrategy}
                >
                  {dragContents.secondRight.length > 0 ? (
                    dragContents.secondRight?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="secondRight"
                        onDelete={handleDeleteItem}
                      />
                    ))
                  ) : (
                    <p className="text-center py-1 opacity-55">Empty</p>
                  )}
                </SortableContext>
              </div>
            </DroppableContainer>
          </div>
        )}
        {isTemplate2 && (
          <div className={`${ layoutClass || "column_layout_2"} gap-2`}>
            <DroppableContainer id="first" isEmpty={dragContents.first.length === 0}>
              <div
                className={`flex flex-col gap-2 h-full ${
                  dragContents.first.length === 0 && "justify-center"
                }`}
              >
                <SortableContext
                  items={dragContents.first}
                  strategy={verticalListSortingStrategy}
                >
                  {dragContents.first.length > 0 ? (
                    dragContents.first?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="first"
                        onDelete={handleDeleteItem}
                      />
                    ))
                  ) : (
                    <p className="text-center py-1 opacity-55">Empty</p>
                  )}
                </SortableContext>
              </div>
            </DroppableContainer>
            <DroppableContainer id="secondAll" isEmpty={dragContents.secondAll.length === 0}>
              <div className={`flex flex-col gap-2 h-full ${dragContents.secondAll.length === 0 && "justify-center"}`}>
                <SortableContext items={dragContents.secondAll} strategy={verticalListSortingStrategy}>
                  {dragContents.secondAll.length > 0 ? (
                    dragContents.secondAll?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="secondAll"
                        onDelete={handleDeleteItem}
                      />
                    ))
                  ) : (
                    <p className="text-center py-1 opacity-55">Empty</p>
                  )}
                </SortableContext>
              </div>
            </DroppableContainer>
          </div>
        )}
        {templateName === "template3" && (
          <div className={`grid gap-2`}>
            <DroppableContainer
              id="first"
              isEmpty={dragContents.first.length === 0}
            >
              <div
                className={`flex flex-col gap-2 ${
                  dragContents.first.length === 0 && "justify-center"
                }`}
              >
                <SortableContext
                  items={dragContents.first}
                  strategy={verticalListSortingStrategy}
                >
                  {
                    dragContents.first?.map((d) => (
                      <Dragitem
                        key={d}
                        id={d}
                        containerId="first"
                        onDelete={handleDeleteItem}
                      />
                    ))
                   }
                </SortableContext>
              </div>
            </DroppableContainer>
          </div>
        )}
      </DndContext>
    </div>
  );
}
