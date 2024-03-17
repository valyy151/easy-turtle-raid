import { AddTrash } from "@/components/add-trash";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { raid: string };
}): Promise<Metadata> {
  const id = params.raid;

  const raid = await api.raid.getById.query(id);

  return {
    title: `Add trash - ${raid?.name}`,
    description: `Add trash for ${raid?.name}`,
    icons: [{ rel: "icon", url: "/turtle.svg" }],
  };
}

export default async function AddRaidTrash({
  params,
}: {
  params: { raid: string };
}) {
  const session = await getServerAuthSession();

  if (session?.user.name !== process.env.ADMIN) {
    return redirect(`/${params.raid}`);
  }

  const raid = await api.raid.getById.query(params.raid);

  return (
    <div className="max-w-3xl pt-1">
      <h1 className="font-concert text-3xl">Add trash pack for {raid?.name}</h1>

      <AddTrash raidId={raid?.id!} />
    </div>
  );
}
