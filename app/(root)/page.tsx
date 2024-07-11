import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import logopng from "@/public/assets/images/Invi.png";
import Link from "next/link"; //new

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <div className="flex flex-col md:flex-row gap-16 justify-between w-full items-center max-w-4xl sm:mx-auto m-4">
      <div className="flex flex-col max-w-sm gap-8 items-center text-center md:items-start md:text-left">
        <Image src={logopng} alt="logo" className="w-16" />
        <h1 className="text-gray-800 font-semibold text-4xl md:text-5xl">
          Delightful events <span className="text-rose-400">start here.</span>{" "}
        </h1>
        <p className="text-gray-600">
          Set up an event page, invite friends and sell tickets. Host a
          memorable event today.
        </p>
        <Link href="/events/create">
          <button className="px-6 py-2 bg-gray-800 rounded-lg text-white text-lg font-medium hover:bg-gray-600 border-none">
            Create Your First Event
          </button>
        </Link>
      </div>

      <video
        autoPlay
        muted
        loop
        className="w-full mx-4 sm:mx-0 sm:w-1/2 bg-transparent"
      >
        <source src="https://cdn.lu.ma/landing/phone-dark.webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
