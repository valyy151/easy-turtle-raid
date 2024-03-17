"use client";
import Image from "next/image";
import type { Trash } from "@/trpc/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { api } from "@/trpc/react";
import type { Session } from "next-auth";

export function TrashPack({
  trash,
  raidId,
  session,
}: {
  trash: Trash;
  raidId: string;
  session: Session | null;
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const deleteTrash = api.raid.deleteTrash.useMutation({
    onSuccess: () => {
      router.push(`/${raidId}`);
      router.refresh();
    },
  });

  return (
    <>
      <div className="flex w-full max-w-3xl flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="pb-1 font-concert text-2xl">{trash.title}</h2>
          {session?.user.name === process.env.NEXT_PUBLIC_ADMIN && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full p-2 ring-0 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <MoreVerticalIcon size={20} className="text-gray-200" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => router.push(`/${raidId}/edit/${trash.id}`)}
                >
                  <PencilIcon size={16} className="mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShow(true)}>
                  <Trash2Icon size={16} className="mr-2 text-red-400" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Image
          className="aspect-square rounded object-center"
          src={trash.imageURL!}
          alt={trash.title!}
          height={300}
          width={300}
        />
        <p className="text-lg">{trash.description}</p>
      </div>
      <AlertDialog open={show} onOpenChange={setShow}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this trash pack?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-950 hover:bg-gray-900 hover:text-white focus-visible:outline-none ">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTrash.mutate(trash.id)}
              disabled={deleteTrash.isLoading}
              className="bg-gray-800 hover:text-red-400 focus-visible:outline-none "
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
