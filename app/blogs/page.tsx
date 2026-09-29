import type { Metadata } from "next";
import BlogsIndex from "@/components/BlogsIndex";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Cancer care articles from Dr. (Brig.) A. K. Dhar — treatment choices, second opinions, and guidance for patients and families in Gurugram.",
};

export default function BlogsPage() {
  return <BlogsIndex />;
}
