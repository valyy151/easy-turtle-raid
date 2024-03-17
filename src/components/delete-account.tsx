"use client";

import { UserRoundXIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function DeleteAccount() {
  const router = useRouter();

  const deleteAccount = api.deleteAccount.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="mt-8 gap-2 hover:text-red-400">
            Delete Account <UserRoundXIcon size={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your account?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-950 hover:bg-gray-900 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAccount.mutate()}
              className="bg-gray-800 hover:text-red-400"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
