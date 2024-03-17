"use client";

import { api } from "@/trpc/react";
import { Boss } from "@/trpc/shared";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export function EditTactics({ boss }: { boss: Boss }) {
  const router = useRouter();
  const params = useParams();
  const [dps, setDps] = useState(
    (boss?.tactics?.dps as string) || "Insert DPS tactics here",
  );
  const [tank, setTank] = useState(
    (boss?.tactics?.tank as string) || "Insert Tank tactics here",
  );
  const [heal, setHeal] = useState(
    (boss?.tactics?.heal as string) || "Insert Healers tactics here",
  );
  const [imageURL, setImageURL] = useState(boss?.imageURL as string);

  const updateTactics = api.boss.updateTactics.useMutation({
    onSuccess: () => {
      router.push(`/${params.raid}/${params.boss}`);
      router.refresh();
    },
  });

  const saveChanges = () => {
    updateTactics.mutate({
      id: boss?.id as string,
      dps: dps ?? "Insert DPS tactics here",
      tank: tank ?? "Insert Tank tactics here",
      heal: heal ?? "Insert Healers tactics here",
      imageURL: imageURL,
    });
  };

  return (
    <div className="w-full pt-4">
      <label
        htmlFor="dps-tactics"
        className="block pb-1 pl-1 font-concert text-lg font-semibold text-red-500"
      >
        DPS Tactics
      </label>
      <textarea
        value={dps}
        id="dps-tactics"
        onChange={(e) => setDps(e.target.value)}
        className="min-h-48 w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />

      <label
        htmlFor="tank-tactics"
        className="block pb-1 pl-1 pt-2 font-concert text-lg font-semibold text-sky-500"
      >
        Tank Tactics
      </label>
      <textarea
        value={tank}
        id="tank-tactics"
        onChange={(e) => setTank(e.target.value)}
        className="min-h-48 w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />
      <label
        htmlFor="healer-tactics"
        className="block pb-1 pl-1 pt-2 font-concert text-lg font-semibold text-green-500"
      >
        Healer Tactics
      </label>
      <textarea
        value={heal}
        id="healer-tactics"
        onChange={(e) => setHeal(e.target.value)}
        className="min-h-48 w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />

      <label
        htmlFor="image-url"
        className="block pb-1 pl-1 pt-2 font-concert text-lg font-semibold"
      >
        Image URL
      </label>
      <input
        value={imageURL}
        id="image-url"
        onChange={(e) => setImageURL(e.target.value)}
        className="w-full rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
      />

      <Button
        onClick={saveChanges}
        disabled={updateTactics.isLoading}
        className="mt-4"
      >
        Save changes
      </Button>
    </div>
  );
}
