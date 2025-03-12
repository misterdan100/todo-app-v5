import { HeaderPage } from "@/components";
import TagsSecction from "./TagsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  return (
    <>
      <HeaderPage title="Tags" filters={false} />

      <TagsSecction />
    </>
  );
}
