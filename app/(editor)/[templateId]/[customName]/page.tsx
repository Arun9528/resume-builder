import Custompage from "../../components/custompage";
import { TemplateKey } from "../layout";

export default async function Custom({params}:Readonly<{params:Promise<{customName:TemplateKey}>}>){
    const {customName} = await params;
    return (
        <>
            <Custompage customName={customName}/>
        </>
    )
}