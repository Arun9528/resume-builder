import Link from "next/link";
import { TemplateKey } from "../[templateId]/layout";
import ClientSidebar from "./clientSideComponents/clientsidebar";

export default async function Sidebar({
  templateId,
}: {
  templateId: TemplateKey;
}) {
  return (
    <div 
    className=" overflow-hidden lg:border-r lg:border-r-gray-500/35 md:pb-5 md:pt-3 pt-0 lg:sticky lg:top-0 col-span-2 lg:col-span-1"
    >
      <div className="text-center hidden lg:block  ">
        <Link href={"/"} className="text-[1.7vw] font-bold">
          Resume
          <span className="text-teal-400">Builder</span>
        </Link>
      </div>
      <ClientSidebar templateId={templateId} />
    </div>
  );
}
