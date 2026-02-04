import { getWithdrawl } from "@/actions/withdrawal";
import PaginationControls from "@/components/Pagination";
import WithdrawTable from "@/components/tables/AprroveWithdrawTable";

interface TransactionsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ApprovePage({
    searchParams,
}: TransactionsPageProps) {
    const res = await getWithdrawl();
    const params = await searchParams;

    return (
        <main>
            <section className="py-8 px-8">
                <div className="page-content">
                    <WithdrawTable payments={res.data} />
                    <PaginationControls
                        currentPage={res.current_page}
                        lastPage={res.last_page}
                        hasNextPage={!!res.next_page_url}
                        hasPrevPage={!!res.prev_page_url}
                        baseUrl="/approve"
                        searchParams={params}
                    />
                </div>
            </section>
        </main>
    );
}
