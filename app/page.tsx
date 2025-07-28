import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
export default function Home() {
  return (
    <>
      <Header />
      <div>
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold py-3 ">
          Please select a template for your Single Page resume. You can always
          change it later.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-7 p-5">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="relative overflow-hidden box-border transition-all duration-200 ease-in-out justify-self-center z-0 group hover:outline-4 outline-sky-600 w-72 md:w-80"
            >
              <Image
                  src={`/images/thumbnails/template-${id}.png`}
                  alt="Web Developer"
                  width={400}
                  height={350}
                  className="w-auto h-auto  cursor-pointer"
                  // priority
                  loading="lazy"
                />
              <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 z-30 flex justify-center items-center ">
                <Link
                  href={`/template${id}/heading`}
                  className="text-white font-semibold bg-sky-500 px-2 py-1.5 rounded-md"
                >
                  Use Template {id}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
