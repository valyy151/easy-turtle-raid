"use client";
import Link from "next/link";
import { useOptimistic } from "react";
import { useParams } from "next/navigation";

export function BossLink({
  boss,
  raidId,
}: {
  boss: { id: string; name: string };
  raidId: string;
}) {
  const params = useParams();
  const [isClicked, setIsClicked] = useOptimistic(false);

  const isCurrent = params.boss === boss.id;
  return (
    <Link
      key={boss.id}
      href={`/${raidId}/${boss.id}`}
      className={`h-fit w-full rounded-lg px-4 py-2 text-lg font-medium duration-100 hover:bg-[#111827] ${isCurrent && "bg-[#1f2937] text-green-400 hover:bg-[#1f2937]"}  ${isClicked && "bg-[#1f2937] text-green-400 hover:bg-[#1f2937]"}`}
      onClick={() => setIsClicked(true)}
    >
      {boss.name}
    </Link>
  );
}
