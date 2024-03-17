export default function BossLoading() {
  return (
    <div className="flex flex-col gap-4 pt-1">
      <div className="h-8 w-96 animate-pulse rounded-md bg-gray-800"></div>
      <div className="mt-0.5 flex gap-14">
        <div className="h-96 w-full max-w-[50rem] animate-pulse rounded-md bg-gray-800"></div>
        <div className="h-[300px] w-[300px] animate-pulse rounded-md bg-gray-800"></div>
      </div>
    </div>
  );
}
