import { Sidebar } from "../../components/sidebar";

export default function BossLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { raid: string };
}) {
  return (
    <div className="flex">
      <Sidebar raidId={params.raid} />
      <div className="h-screen w-full border-l border-gray-700 pl-4">
        {children}
      </div>
    </div>
  );
}
