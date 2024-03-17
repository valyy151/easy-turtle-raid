"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "@/trpc/react";

export function CreateRaid() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isTurtle, setIsTurtle] = useState(false);

  const createRaid = api.raid.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setType("");
      setId("");
      setIsTurtle(false);
    },
  });

  //auto generate id (example: Zul Gurub will be zul-gurub or Zul'Gurub will be zul-gurub)
  const generateId = (name: string) => {
    return name.toLowerCase().replace(/ /g, "-").replace(/'/g, "-");
  };

  useEffect(() => {
    setId(generateId(name));
  }, [name]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createRaid.mutate({ id, name, type, isTurtle });
      }}
      className="flex flex-col gap-2 pt-8"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPaste={(e) => setName(e.clipboardData.getData("text/plain"))}
        className="w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-gray-200 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-gray-200 focus:outline-none"
      />

      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-gray-200 focus:outline-none"
      />
      <label className="flex flex-col items-center gap-2 pt-4">
        <input
          type="checkbox"
          checked={isTurtle}
          onChange={(e) => setIsTurtle(e.target.checked)}
          className="rounded-md focus:outline-none"
        />
        <span>Is Turtle</span>
      </label>
      <button
        type="submit"
        className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 focus:outline-none"
        disabled={createRaid.isLoading}
      >
        {createRaid.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
