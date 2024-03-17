"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export function BossLink({
  boss,
  raidId,
}: {
  boss: { id: string; name: string };
  raidId: string;
}) {
  const params = useParams();
  return (
    <Link
      key={boss.id}
      href={`/${raidId}/${boss.id}`}
      className={`h-fit w-full rounded-lg px-4 py-2 text-lg font-medium duration-100 hover:bg-gray-800 ${params.boss === boss.id && "bg-gray-800 text-green-400"}`}
    >
      {boss.name}
    </Link>
  );
}
