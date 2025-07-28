"use client";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

export default function DownloadPDFButton({
  resumeRef,
}: {
  resumeRef: RefObject<HTMLDivElement | null>;
}) {
  //  const generateResumePDF = async () => {
  //   const element = resumeRef?.current;
  //   if (!element) return;

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: [794, 1123],
  //     compress: true
  //   });

  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   const canvas = await html2canvas(element, {
  //     scale: 3,
  //     useCORS: true,
  //     logging: true,
  //     windowHeight: element.scrollHeight
  //   });

  //   const imgData = canvas.toDataURL('image/png', 1.0);
  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let position = 0;
  //   let remainingHeight = imgHeight;

  //   while (remainingHeight > 0) {
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     remainingHeight -= pageHeight;
  //     position -= pageHeight;

  //     if (remainingHeight > 0) {
  //       pdf.addPage([pageWidth, pageHeight], 'portrait');
  //     }
  //   }

  //   pdf.save("Resume.pdf");
  // };
  //  const generateResumePDF = useCallback(() => {
  //     if (!resumeRef.current) return;
  //     // Make sure your div has id="resume"
  //     window.print();
  //   }, [resumeRef]);

  const generateResumePDF = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Resume",
    pageStyle: `@page {
        size: A4;
        margin:0;
         body { 
        margin: 0; 
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      }`,
  });
  return (
    <button
      type="button"
       className="px-5 py-1.5 z-10 bg-yellow-500 text-white rounded-md cursor-pointer "
      onClick={generateResumePDF}
    >
      Download PDF / Save
    </button>
  );
}
