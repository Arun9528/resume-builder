import { SectionProps } from "./headingsection";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function SummarySection({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
}: SectionProps) {
  const Summary = useSelector(
    (state: RootState) => state.resumeBuilder.summary
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[3] === "summary" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className="font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        Summary
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}` }}></div>
      <div
        className="pt-1"
        style={{
          fontSize: fontSize.para,
          lineHeight: lineHeight === 1.1 ? 1.2 : lineHeight,
        }}
      >
        {Summary.description !== "" ? (
          <p style={{ fontSize: fontSize.para, textAlign: "justify" }}>
            {Summary.description}
          </p>
        ) : (
          <p style={{ fontSize: fontSize.para, textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            odit quidem, et nostrum necessitatibus vel. Quaerat at, harum omnis
            nam quibusdam neque obcaecati incidunt totam inventore est nisi
            dolore eveniet.
          </p>
        )}
      </div>
    </div>
  );
}
