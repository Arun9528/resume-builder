import { setDragDefault } from "@/store/slices/styleSlice";
import SplitColumns from "./splitColumns";
import { AppDispatch } from "@/store";
import { initialSection } from "@/app/(editor)/components/SettingPanel/StyleTab/rearrange";

export default function UpdateDragData(
  dispatch: AppDispatch,
  arr1: string[],
  arr2: string[],
  templateName: string,
  title: string,
  valuetitle?: string
): void {
  const sesstionGetData = sessionStorage.getItem("dragContents") || "";
  let data: initialSection = {
    first: [],
    secondLeft: [],
    secondRight: [],
    secondAll: [],
  };
  if (!sesstionGetData) return;
  if (sesstionGetData) {
    const b = JSON.parse(sesstionGetData) as initialSection;
    if (valuetitle === "above") {
      if (templateName === "template1") {
        const secondLeft = b.secondLeft.filter((d) => !d.includes(title));
        const secondRight = b.secondRight.filter((d) => !d.includes(title));
        data = { first: arr1, secondLeft, secondRight, secondAll: [] };
      } else if (templateName === "template2") {
        const secondAll = arr2.filter((d) => !d.includes(title));
        data = { first: arr1, secondLeft: [], secondRight: [], secondAll };
      } else if (templateName === "template3") {
        data = { first: arr1, secondLeft: [], secondRight: [], secondAll: [] };
      }
      dispatch(setDragDefault(data));
      sessionStorage.setItem("dragContents", JSON.stringify(data));
      return;
    } else if (valuetitle === "below") {
      const first = b.first.filter((d) => !d.includes(title));
      if (templateName === "template1") {
        const { left, right } = SplitColumns(arr2);
        data = { first, secondLeft: left, secondRight: right, secondAll: [] };
      } else if (templateName === "template2") {
        data = { first, secondLeft: [], secondRight: [], secondAll: arr2 };
      } else if (templateName === "template3") {
        data = { first, secondLeft: [], secondRight: [], secondAll: [] };
      }
      dispatch(setDragDefault(data));
      sessionStorage.setItem("dragContents", JSON.stringify(data));
      return;
    }
    const firstA = arr1.filter((d) => b.first.includes(d));
    if (templateName === "template1") {
      // const firstA = arr1.filter(d=> b.first.includes(d));
      const secondLeftA = arr2.filter((d) => b.secondLeft.includes(d));
      const secondRightA = arr2.filter((d) => b.secondRight.includes(d));
      data = {
        first: firstA,
        secondLeft: secondLeftA,
        secondRight: secondRightA,
        secondAll: [],
      };
    } else if (templateName === "template2") {
      const secondAllB = arr2.filter((d) => b.secondAll.includes(d));
      data = {
        first: firstA,
        secondLeft: [],
        secondRight: [],
        secondAll: secondAllB,
      };
    } else if (templateName === "template3") {
      data = { first: firstA, secondLeft: [], secondRight: [], secondAll: [] };
    }
  }
  dispatch(setDragDefault(data));
  sessionStorage.setItem("dragContents", JSON.stringify(data));
}
