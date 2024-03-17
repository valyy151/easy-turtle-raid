import { TrashPack } from "@/components/trash-pack";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { raid: string };
}): Promise<Metadata> {
  const id = params.raid;

  const raid = await api.raid.getById.query(id);

  return {
    title: `${raid?.name}`,
    description: `Trash tactics for ${raid?.name}`,
    icons: [{ rel: "icon", url: "/turtle.svg" }],
  };
}

export default async function RaidPage({
  params,
}: {
  params: { raid: string };
}) {
  const session = await getServerAuthSession();
  const raid = await api.raid.getById.query(params.raid);
  const trash = await api.raid.getTrash.query(params.raid);

  return (
    <div className="pt-1">
      <div className="flex items-end">
        <h1 className="font-concert text-3xl">
          Trash tactics for {raid?.name}
        </h1>
        {session?.user?.name === process.env.ADMIN && (
          <Link
            href={`/${params.raid}/add`}
            title="Add a trash pack"
            className="ml-8"
          >
            <CirclePlus
              size={22}
              className="text-gray-400 duration-100 hover:text-white"
            />
          </Link>
        )}
      </div>
      <section className="mt-8 flex flex-col gap-12 pb-8">
        {trash.length > 0 ? (
          trash?.map((t, i) => (
            <TrashPack
              key={i}
              trash={t}
              raidId={params.raid}
              session={session}
            />
          ))
        ) : (
          <div className="flex flex-col items-start gap-2">
            <p className="text-xl">No trash packs added for this raid.</p>
          </div>
        )}
      </section>
    </div>
  );
}
