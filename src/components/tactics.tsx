export function Tactics({
  tactics,
  title,
}: {
  tactics: string | null | undefined;
  title: string;
}) {
  return (
    <div className="flex min-w-[65ch] max-w-prose flex-col">
      <strong
        className={`pb-2 font-concert text-3xl ${title === "DPS" && "text-red-500"} ${title === "Healers" && "text-green-500"} ${title === "Tank" && "text-sky-500"}`}
      >
        {title}
      </strong>
      <div className="text-xl leading-7">
        {tactics
          ? tactics?.split("\n").map((line, i) => (
              <div key={i}>
                {line}
                <div className="h-2" />
              </div>
            ))
          : `Insert ${title} tactics here`}
      </div>
    </div>
  );
}
