"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { sendMail } from "@/server/actions/send";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { AuthButtons } from "./auth-buttons";
import { Boss } from "@/trpc/shared";

export function SuggestChanges({
  boss,
  raid,
  session,
}: {
  boss: Boss;
  raid: string;
  session: Session | null;
}) {
  const [suggestion, setSuggestion] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!suggestion) {
      toast("Please write a suggestion");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendMail({ raid, boss: boss?.name as string, suggestion });
      setSuggestion("");
      setOpen(false);
      toast("Suggestion sent!");
    } catch (error) {
      toast("An error occurred, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button title="Suggest a change" onClick={() => setOpen(true)}>
        Suggest changes
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {session?.user.id ? (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Suggest changes for {boss?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Please keep in mind that the tactics must be as short as
                possible and easy to understand.
              </DialogDescription>
            </DialogHeader>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="min-h-96 rounded-md border border-gray-800 bg-black p-2 text-sm focus:border-gray-600 focus:outline-none focus-visible:border-gray-600 focus-visible:outline-none"
            />
            <Button disabled={isSubmitting} onClick={handleSubmit}>
              Submit
            </Button>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Suggest changes</DialogTitle>
              <DialogDescription className="text-gray-400">
                You need to be signed in to suggest changes
              </DialogDescription>
            </DialogHeader>

            <AuthButtons
              session={session}
              callbackURL={`/${raid}/${boss?.id}`}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
