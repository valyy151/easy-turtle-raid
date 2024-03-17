import { EditTactics } from "@/components/edit-tactics";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { boss: string };
}): Promise<Metadata> {
  const id = params.boss;

  const boss = await api.boss.getById.query(id);

  return {
    title: `Edit tactics - ${boss?.name}`,
    description: `Edit tactics for ${boss?.name}`,
    icons: [{ rel: "icon", url: "/turtle.svg" }],
  };
}

export default async function EditBossPage({
  params,
}: {
  params: { raid: string; boss: string };
}) {
  const session = await getServerAuthSession();

  if (session?.user.name !== process.env.ADMIN) {
    return redirect(`/${params.raid}/${params.boss}`);
  }

  noStore();
  const boss = await api.boss.getById.query(params.boss);
  return (
    <div className="max-w-3xl pt-1">
      <h1 className="font-concert text-3xl">Edit tactics for {boss?.name}</h1>

      <EditTactics boss={boss} />
    </div>
  );
}
