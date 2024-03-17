"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "@/trpc/shared";

export function EditTrash({ raidId, trash }: { raidId: string; trash: Trash }) {
  const [title, setTitle] = useState(trash?.title || "Enter trash title here");
  const [imageURL, setImageURL] = useState(trash?.imageURL || "");
  const [description, setDescription] = useState(
    trash?.description || "Enter trash tactics here",
  );

  const router = useRouter();

  const editTrash = api.raid.editTrash.useMutation({
    onSuccess: () => {
      router.push(`/${raidId}`);
      router.refresh();
    },
  });

  const handleSubmit = () => {
    editTrash.mutate({
      id: trash.id,
      raidId,
      title,
      imageURL,
      description,
    });
  };

  return (
    <div>
      <label
        htmlFor="title"
        className="block pb-1 pl-1 pt-4 font-concert text-lg font-semibold"
      >
        Title
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        className="w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />
      <label
        htmlFor="image-url"
        className="block pb-1 pl-1 pt-4 font-concert text-lg font-semibold"
      >
        Image URL
      </label>
      <input
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        id="image-url"
        className="w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />

      <label
        htmlFor="description"
        className="block pb-1 pl-1 pt-4 font-concert text-lg font-semibold"
      >
        Tactics
      </label>
      <textarea
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-48 w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />

      <Button
        className="mt-2"
        onClick={handleSubmit}
        disabled={editTrash.isLoading}
      >
        Submit
      </Button>
    </div>
  );
}
