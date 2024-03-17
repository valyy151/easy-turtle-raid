import { EditTrash } from "@/components/edit-trash";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function EditTrashPage({
  params,
}: {
  params: { raid: string; trash: string };
}) {
  const session = await getServerAuthSession();

  if (session?.user.name !== process.env.ADMIN) {
    return redirect(`/${params.raid}`);
  }

  const trash = await api.raid.getTrashById.query({
    id: params.trash,
  });

  return (
    <div className="max-w-3xl pt-1">
      <h1 className="font-concert text-3xl">
        Edit trash pack for {trash?.raid?.name}
      </h1>

      <EditTrash raidId={trash?.raid?.id!} trash={trash!} />
    </div>
  );
}
