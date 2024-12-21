import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { client, urlFor } from "@/app/lib/sanity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  }
  `;

  const data = await client.fetch(query);

  // console.log("Fetched Data:", data);

  return data;
}

export default async function AllBlogs() {
  const data = await getData();

  return (
    <div className="mt-14 mb-8">
      <h2 className="font-semibold mb-8 text-3xl">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <div className="border flex flex-col gap-4 shadow-md rounded-md p-4">
          <div className="w-full">
            <Image
              alt="img"
              src="/sample.jpg"
              width={300}
              height={300}
              className="rounded-md shadow-sm"
            />
          </div>

          <span className="bg-purple-500 w-fit font-semibold text-white p-1 text-xs rounded-md shadow-sm">
            Health Care
          </span>

          <p className="text-muted-foreground text-xl font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
          <Button
            className="font-bold py-
                2 px-4 rounded"
          >
            <Link href={"#"}>Read More</Link>
          </Button>
        </div> */}
        {data?.map((item: any, idx: any) => (
          <Card key={idx}>
            <CardHeader className="flex flex-col gap-2">
              <CardTitle>
                <Image
                  src={urlFor(item.titleImageUrl).url()}
                  alt="main_image"
                  width={400}
                  height={400}
                  className="rounded-md shadow-md"
                />
              </CardTitle>
              <CardDescription className="bg-purple-500 w-fit p-1 text-xs font-semibold rounded-md text-white">
                {item?.category?.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-semibold text-lg line-clamp-2">{item.title}</p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href={`/blog/${item.currentSlug}`}>Read More ↗</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
