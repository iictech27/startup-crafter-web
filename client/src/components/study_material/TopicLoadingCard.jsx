import { LoadingCard } from "../../layout/Card";
export default function TopicLoadingCard() {
  return (
    <LoadingCard>
      <h3 className="w-5/6 h-8 bg-gray-500"></h3>
      <p className="bg-gray-500 h-4"></p>
      <div className="flex h-8 bg-gray-500 items-center gap-x-2">
      </div>
    </LoadingCard>
  );
}
