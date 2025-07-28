import { TemplateKey } from "@/app/(editor)/[templateId]/layout";


export default function Header({ templateId }: { templateId?:TemplateKey}) {
  return (
    <div
      className={`border-b h-fit border-b-gray-500/35 text-center flex items-center justify-center shadow-md w-full col-span-2 ${
        !!templateId ? "py-3.5 lg:hidden" : "py-5"} `}
    >
      <div className="text-2xl font-bold">
        Resume<span className="text-teal-800 dark:text-teal-300">Builder</span>
      </div>
    </div>
  );
}