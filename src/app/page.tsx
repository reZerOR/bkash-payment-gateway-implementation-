import CreateToken from "@/components/buttons/create_token";
import PayButton from "@/components/buttons/pay";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-2xl font-bold text-center">
        <span className="text-pink-500 underline">Bkash</span> payment getway
      </div>
      <div className="space-x-4">
        <CreateToken />
        <PayButton />
      </div>
    </div>
  );
}
