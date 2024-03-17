"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CreateBoss({ raidId }: { raidId: string }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const createBoss = api.boss.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setId("");
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
        createBoss.mutate({ id, raidId, name });
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
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-gray-200 focus:outline-none"
      />

      <button
        type="submit"
        className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 focus:outline-none"
        disabled={createBoss.isLoading}
      >
        {createBoss.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
