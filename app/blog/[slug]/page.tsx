import { client, urlFor } from "@/app/lib/sanity";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const revalidate = 30;

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
  category->{
    title
  }
         
      }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  console.log(data);
  return (
    <div className="flex flex-col gap-8 my-14">
      <Link className="border p-1 rounded-md w-fit" href={"/"}>
        <ArrowLeft size={20} />
      </Link>
      <p className="bg-purple-500 w-fit p-1 text-xs font-semibold rounded-md text-white">
        {data?.category?.title}
      </p>
      <h1 className="md:text-5xl sm:text-4xl text-3xl leading-snug font-bold">
        {data?.title}
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        alt="img"
        width={1000}
        height={1000}
        className="object-cover rounded-md mx-auto w-full shadow-md relative max-h-[70vh] "
        priority
      />
      <div className=" w-full mx-auto prose prose-headings:text-3xl prose-a:text-blue-500 prose-lg prose-black dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
