import type { Metadata } from "next";
import BlogsIndex from "@/components/BlogsIndex";
import { getBlogPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Cancer care articles from Dr. (Brig.) A. K. Dhar — treatment choices, second opinions, and guidance for patients and families in Gurugram.",
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return <BlogsIndex posts={posts} />;
}

