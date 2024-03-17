import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-center">
      <Link href={"/"} className="py-2 font-concert text-3xl text-green-500">
        Easy Turtle Raid
      </Link>
    </nav>
  );
}
