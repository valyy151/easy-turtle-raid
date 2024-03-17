import { DeleteAccount } from "@/components/delete-account";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function Account() {
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center pt-8">
      <h1 className="font-concert text-3xl font-bold">My Account </h1>

      <div className="flex items-center gap-2 pt-8">
        <span className="text-xl">Signed in via Discord as</span>
        <Image
          src={session?.user.image!}
          width={32}
          height={32}
          alt="User avatar"
          className="rounded-full"
        />
        <span className="text-xl font-semibold text-[#7289da]">
          {session?.user?.name}
        </span>
      </div>

      <DeleteAccount />
    </main>
  );
}
