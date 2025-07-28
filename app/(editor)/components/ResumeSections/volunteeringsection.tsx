import { BiSolidCalendar } from "react-icons/bi";
import { SectionProps } from "./headingsection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function VolunteeringSection({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
}: SectionProps) {
  const Volunteering = useSelector(
    (state: RootState) => state.resumeBuilder.volunteering
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "volunteering" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className="font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        Volunteering
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}` }}></div>
      <div>
        {Volunteering.length > 0 ? (
          Volunteering.map(
            ({
              id,
              jobtitle,
              companyname,
              startdate,
              enddate,
              present,
              description,
            }) => (
              <div
                key={id}
                style={{
                  fontSize: fontSize.para,
                  lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
                }}
              >
                <p
                  className="font-bold"
                  style={{
                    fontSize: fontSize.mainpara,
                    color: fontColor.inner,
                  }}
                >
                  {jobtitle}
                </p>
                <div className="flex justify-between">
                  <p>{companyname}</p>
                  <div className="flex">
                    <BiSolidCalendar
                      style={{ color: fontColor.inner }}
                      className="-translate-y-[1.3px]"
                    />
                    <p className="ms-0.5">{startdate}</p>
                    <span> - </span>
                    <p>{present ? "Present" : enddate}</p>
                  </div>
                </div>
                <p>{description}</p>
              </div>
            )
          )
        ) : (
          <div
            style={{
              fontSize: fontSize.para,
              lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
            }}
          >
            <p
              className="font-bold"
              style={{ fontSize: fontSize.mainpara, color: fontColor.inner }}
            >
              Executive Member
            </p>
            <div className="flex justify-between">
              <p>AIESEC</p>
              <div className="flex">
                <BiSolidCalendar
                  style={{ color: fontColor.inner }}
                  className="-translate-y-[1.3px]"
                />
                <p className="ms-0.5">04/2025 </p>
                <span> - </span>
                <p> Present</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio sunt facere, vitae nostrum vel animi impedit libero,
              fugiat facilis adipisci sint! Illo deserunt recusandae omnis.
              Voluptates voluptate eveniet doloremque impedit, repudiandae odio
              officia doloribus molestias unde quaerat ullam quibusdam pariatur
              ea laboriosam dicta mollitia eum nesciunt nisi error laudantium
              nulla.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
