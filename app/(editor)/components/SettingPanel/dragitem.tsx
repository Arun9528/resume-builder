import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { initialSection } from "./StyleTab/rearrange";
import { IoClose, IoMenu } from "react-icons/io5";

export default function Dragitem({
  id,
  containerId,
  onDelete,
}: {
  id: string;
  containerId: keyof initialSection;
  onDelete:(id:string,containerId: keyof initialSection)=> void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { containerId },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });
  const style = { transform: CSS.Transform.toString(transform), transition ,opacity:isDragging ? 0.5 : 1,scale:isDragging ? 0.8 : 1};
  const handleDelete = (e:React.MouseEvent)=>{
    e.stopPropagation();
    e.preventDefault();
    onDelete(id,containerId);
  }
  return (
    <div  ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style} className="flex items-center border rounded-sm ">
      <IoMenu className="flex-none ms-2"/>
      <p className="capitalize px-3 py-2 cursor-pointer text-center flex-1">
      {id}
    </p>
    <button onClick={handleDelete} className="flex-none px-2">
      <IoClose className=" text-red-700 cursor-pointer"/>
    </button>
    </div>
  );
}
