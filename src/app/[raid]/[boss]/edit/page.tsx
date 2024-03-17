import { EditTactics } from "@/components/edit-tactics";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

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
