import { getData } from "@/lib/fetch/getData";
import { SuccessTransactionData } from "@/types/successDataType/successDataType";
import { Home } from "lucide-react";
import Link from "next/link";
import SuccessPageComponent from "./SuccessPage";

interface SuccessPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const merchantTransactionId = searchParams.MerchantTransactionId;

  if (!merchantTransactionId) {
    return (
      <div className="md:min-h-screen h-[50vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Something Went Wrong
          </h2>
          <p className="text-muted-foreground mb-6">Please try again.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition-shadow"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const successTransaction: SuccessTransactionData = await getData(
    `/eps/verify/${merchantTransactionId}`,
    { next: { revalidate: 60 } }
  );
  return <SuccessPageComponent successTransaction={successTransaction} />;
}
