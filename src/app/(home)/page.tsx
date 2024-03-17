import Link from "next/link";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { AuthButtons } from "@/components/auth-buttons";
import { Code2Icon, CoffeeIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const raidTypes = await api.raid.getAll.query();
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col items-center gap-3 pt-8">
        {raidTypes.map((raids, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center rounded-md border border-gray-600 px-6 pb-6 pt-2"
          >
            <h3
              className={`pb-4 font-concert text-3xl font-bold ${raids[0]?.type == "10" && "text-blue-400"} ${raids[0]?.type == "20" && "text-amber-300"} ${raids[0]?.type == "40" && "text-rose-500"}`}
            >
              Raid {raids[0]?.type}
            </h3>
            <div className="flex flex-col items-center text-2xl">
              {raids.map((raid) => (
                <Link
                  key={raid.id}
                  href={`/${raid.id}`}
                  className={`py-2 font-medium duration-100 ${raid.type == "10" && "hover:text-blue-400"} ${raid.type == "20" && "hover:text-amber-300"} ${raid.type == "40" && "hover:text-rose-500"}
                  `}
                >
                  {raid.name}{" "}
                  {raid.isTurtle && (
                    <span className="font-bold text-green-500">
                      (TurtleWoW)
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="pt-10">
        <AuthButtons session={session} />
      </div>

      <footer className="fixed bottom-0 flex w-full justify-around text-xs font-semibold text-gray-400">
        <p>
          Made with <span className="text-red-500">❤️</span> by Valden
        </p>
        <div className="flex gap-8">
          <Link
            target="_blank"
            className="group flex gap-2 py-1 hover:text-gray-200"
            href={"https://paypal.me/valyy151"}
          >
            <CoffeeIcon
              size={18}
              className="duration-100 group-hover:text-green-400"
            />
            Buy me a coffee
          </Link>
          <Link
            target="_blank"
            className="group flex gap-2 py-1 hover:text-gray-200"
            href={"https://github.com/valyy151/easy-turtle-raid"}
          >
            <Code2Icon
              size={18}
              className="duration-100 group-hover:text-green-400"
            />
            Source code
          </Link>
        </div>
      </footer>
    </main>
  );
}
