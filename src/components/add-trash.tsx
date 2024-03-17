"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export function AddTrash({ raidId }: { raidId: string }) {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const addTrash = api.raid.createTrash.useMutation({
    onSuccess: () => {
      router.push(`/${raidId}`);
      router.refresh();
    },
  });

  const handleSubmit = () => {
    addTrash.mutate({
      raidId,
      title: title || "Enter trash title here",
      imageURL,
      description: description || "Enter trash tactics here",
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
        onClick={handleSubmit}
        className="mt-2"
        disabled={addTrash.isLoading}
      >
        Submit
      </Button>
    </div>
  );
}
