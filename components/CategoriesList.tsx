// import { aiBlogCategories } from "@/constants";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import React from "react";

async function getData() {
  const query = `*[_type == "category"] | order(_createdAt desc) {
    title,
   
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function CategoriesList() {
  const data = await getData();
  // console.log(data);
  return (
    <div className="mt-20">
      <h2 className="mb-8 font-semibold text-3xl">AI in</h2>

      <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {data?.map((item: any, idx: any) => (
          <Link
            href="#"
            className={`flex items-center justify-center p-2 shadow-md rounded-md dark:text-black font-semibold `}
            key={idx}
          >
            {item.title}{" "}
          </Link>
        ))}
      </div>
    </div>
  );
}
