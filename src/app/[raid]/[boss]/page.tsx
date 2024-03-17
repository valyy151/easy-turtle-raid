import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { SquarePenIcon } from "lucide-react";
import { Tactics } from "@/components/tactics";
import { SuggestChanges } from "@/components/suggest-changes";
import { getServerAuthSession } from "@/server/auth";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { boss: string };
}): Promise<Metadata> {
  const id = params.boss;

  const boss = await api.boss.getById.query(id);

  return {
    title: `${boss?.name} - Tactics`,
    description: `Tactics for ${boss?.name}`,
    icons: [{ rel: "icon", url: "/turtle.svg" }],
  };
}

export default async function BossPage({
  params,
}: {
  params: { raid: string; boss: string };
}) {
  const session = await getServerAuthSession();
  const boss = await api.boss.getById.query(params.boss);
  return (
    <div className="flex flex-col gap-4 pt-1">
      <h4 className="font-concert text-3xl font-semibold">{boss?.name}</h4>
      <div className="flex items-start">
        <div className="flex flex-col gap-4 pt-4">
          <Tactics title="DPS" tactics={boss?.tactics?.dps} />
          <Tactics title="Tank" tactics={boss?.tactics?.tank} />
          <Tactics title="Healers" tactics={boss?.tactics?.heal} />
        </div>
        {session?.user?.name === process.env.ADMIN && (
          <Link
            href={`/${params.raid}/${boss?.id}/edit`}
            className="mt-8 text-gray-400 duration-100 hover:text-white"
          >
            <SquarePenIcon size={24} />
          </Link>
        )}
        <div className="ml-16">
          <Image
            className="aspect-square rounded object-center"
            src={boss?.imageURL!}
            alt={boss?.name!}
            width={300}
            height={300}
          />
        </div>
      </div>
      <SuggestChanges session={session} raid={params.raid} boss={boss} />
    </div>
  );
}
