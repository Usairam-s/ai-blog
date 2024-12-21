import AllBlogs from "@/components/AllBlogs";
import CategoriesList from "@/components/CategoriesList";

import Image from "next/image";
import { client, urlFor } from "./lib/sanity";

// gte all blog
async function getData() {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
    title,
    "currentSlug" : slug.current,
    "titleImageUrl": titleImage.asset->url,
    smallDesription,
    content,
    category->{
      title
    }
  }[0]
  `;

  const data = await client.fetch(query);

  // console.log("Fetched Data:", data);

  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <div className="my-10 relative h-[calc(70vh-60px)]">
        <Image
          src={urlFor(data.titleImageUrl).url()}
          alt="main_img"
          layout="fill"
          className="object-cover rounded-md shadow-sm "
        />
        <div className="absolute max-w-[500px] flex flex-col gap-2 -bottom-8 left-20 p-4 text-black bg-white rounded-md shadow-xl">
          {/* tag{" "} */}
          <span className="bg-purple-500 w-fit font-semibold text-white p-1 text-xs rounded-md shadow-sm">
            {data?.category?.title}
          </span>
          <h2 className="text-2xl font-semibold text-black">{data?.title}</h2>
        </div>
      </div>
      {/* // Catgeoriees */}
      <CategoriesList />
      <AllBlogs />
    </>
  );
}
