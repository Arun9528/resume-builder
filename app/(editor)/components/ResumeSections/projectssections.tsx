import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";

export default function ProjectsSection({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
}: SectionProps) {
  const projects = useSelector(
    (state: RootState) => state.resumeBuilder.project
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "projects" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className=" font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        Projects
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}`}}></div>
        {projects.length > 0 ? (
          projects.map(({ id, projectname, description }) => (
            <div key={id}   style={{ lineHeight: lineHeight === 1.1 ? 1.2 : lineHeight }}>
              <h3 className="font-semibold">{projectname}</h3>
              <p className="text-justify">{description}</p>
            </div>
          ))
        ) : (
          <>
            {["Watch", "Dream"].map((d, i) => (
              <div key={i} style={{ fontSize: fontSize.para,lineHeight: lineHeight === 1.1 ? 1.2 : lineHeight }}>
                <h3
                  className="font-semibold"
                  style={{ color: fontColor.inner }}
                >
                  {d}
                </h3>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima a libero natus eos tenetur? Nemo velit ad ea odio
                  commodi.
                </p>
              </div>
            ))}
          </>
        )}
      </div>
  );
}
