"use client"
import Link from "next/link";
import { TemplateKey } from "../../[templateId]/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";

interface Links {
  name: string;
  href: string;
}
const template = [
  "heading",
  "skills",
  "experience",
  "projects",
  "summary",
  "education",
  "achievements",
  "strengths",
  "review",
];
interface clientSideProps{
  templateId:TemplateKey
}
export default function ClientSidebar({templateId}:clientSideProps) {
  const paths = usePathname();
  const {first,second,other} = useSelector((state:RootState)=> state.style.addSection[templateId] )
  
  const removecustom = other.map((d) => d.replaceAll(" (custom)", "").trim()).filter(Boolean);
  const removeFirst = first.filter((d) => !removecustom.includes(d));
  const removeSecond = second.filter((d) => !removecustom.includes(d));
  const allowed = new Set([...removeFirst, ...removeSecond]);
  const dynamic = template?.filter((item) => allowed.has(item));
  const sections = ["heading", ...dynamic, ...removecustom, "review"];
  const SidebarLinks: Links[] = sections.map((d) => ({
    name: d,
    href: `/${
      d.includes("training / courses") ? "trainingandcourses" : d?.toLowerCase()
    }`,
  }));
  return (
    <div className="flex flex-wrap justify-center gap-x-8 lg:gap-x-0 lg:flex-col lg:gap-y-5 lg:justify-self-center pt-6 overflow-hidden ">
      {SidebarLinks.map(({ href, name }, i) => {
        const hrefs = `/${templateId}${href}`;
        const active = paths === hrefs;
        return (
          <div key={i} className="group relative w-fit">
            <Link
              href={`${hrefs}`}
              className={`transition-colors duration-300 font-semibold capitalize ${
                active ? "text-sky-400 font-medium" : ""
              }`}
            >
              {name}
            </Link>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
        );
      })}
    </div>
  );
}
