
import Maincontent from "../components/maincontent";
import Sidebar from "../components/sidebar";
import GridWripper from "../components/clientSideComponents/gridWripper";
import Previewpanel from "../components/previewpanel";
import Header from "@/components/header";
export type TemplateKey = "template1" | "template2" | "template3";
export default async function TemplateLayout({children,params}: Readonly<{ children: React.ReactNode,params:Promise<{templateId:TemplateKey}>}>) {
    const {templateId} = await params;
  return (
    <GridWripper>
         <Header templateId={templateId} />
         <Sidebar key={templateId} templateId={templateId} />
         <Maincontent>{children}</Maincontent>
         <Previewpanel templateId={templateId} isReveiwPage={true} />
    </GridWripper>
  );
}
