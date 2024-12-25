"use client";
import Image from "next/image";
import React, { useState } from "react";
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

interface BlogProps {
  blogs: any[];
  categories: any[];
}

export default function AllBlogs({ blogs, categories }: BlogProps) {
  const [category, setCategory] = useState("");

  const filteredBlogs = category
    ? blogs.filter((item) => item.category?.title === category)
    : blogs;
  return (
    <>
      <div className="mt-20">
        <h2 className="mb-8 font-semibold text-3xl">AI in</h2>

        <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {categories?.map((item: any, idx: any) => (
            <div
              // href="#"
              className={` ${item.title == category ? "dark:bg-white dark:text-black bg-black text-white" : ""}  dark:border flex items-center justify-center p-2 shadow-md cursor-pointer rounded-md  font-semibold `}
              key={idx}
              onClick={() => setCategory(item.title)}
            >
              {item.title}{" "}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 mb-8">
        <div className="w-full mb-8 flex items-center justify-between">
          <h2 className="font-semibold text-3xl">
            {category ? `${category} Blogs` : "Latest Blogs"}
          </h2>
          {category && (
            <Button onClick={() => setCategory("")}>Clear filter</Button>
          )}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center h-64">
            <p className="text-lg font-semibold">No blogs in this category</p>
            <Button variant={"outline"} onClick={() => setCategory("")}>
              Clear filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBlogs.map((item: any, idx: any) => (
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
                  <CardDescription
                    className={`bg-black dark:bg-white w-fit p-1 text-xs font-semibold rounded-md dark:text-black text-white`}
                  >
                    {item?.category?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold text-lg line-clamp-2">
                    {item.title}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Link href={`/blog/${item.currentSlug}`}>Read More ↗</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
