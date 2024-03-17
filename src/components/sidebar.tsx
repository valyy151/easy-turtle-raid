import Link from "next/link";
import { api } from "@/trpc/server";
import { BossLink } from "./boss-link";

export async function Sidebar({ raidId }: { raidId: string }) {
  const raid = await api.raid.getById.query(raidId);

  return (
    <div className="flex min-w-fit flex-col">
      <h2
        className={`flex w-full flex-col border-b border-gray-700 px-8 pb-4 pt-2 font-concert text-2xl font-semibold ${raid?.type === "10" && "text-blue-400"} ${raid?.type == "20" && "text-amber-300"} ${raid?.type == "40" && "text-rose-500"}`}
      >
        <Link href={`/${raid?.id}`}>{raid?.name}</Link>
      </h2>
      <div className="flex flex-col gap-1 px-4 pt-2">
        {raid?.bosses?.map((boss) => <BossLink boss={boss} raidId={raidId} />)}
      </div>
    </div>
  );
}
