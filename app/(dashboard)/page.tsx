import MainInfo from "./home/sections/MainInfo";
import Growth from "./home/sections/Growth";
import Summary from "./home/sections/Summary";
import Transactions from "./home/sections/Transactions";
import Breakdown from "./home/sections/Breakdown";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string }>;
}) {
    const params = await searchParams;

    const growth_period = params.growth_period || "annual";
    const summary_filter = params.summary_filter || "year";
    const transactions_filter = params.transactions_filter || "year";
    const breakdown_filter = params.breakdown_filter || "year";

    return (
        <main>
            <MainInfo />
            <section className="py-8 px-8 flex md:grid gap-8 flex-col md:grid-cols-3 md:justify-between border-b-gradient">
                <Growth period={growth_period} searchParams={params} />
                <Summary filter={summary_filter} searchParams={params} />
            </section>
            <section className="grid md:grid-cols-3 gap-8 border-b-gradient py-8 px-8">
                <Transactions
                    filter={transactions_filter}
                    searchParams={params}
                />
            </section>
            <section className="grid md:grid-cols-3 gap-8 border-b-gradient py-8 px-8">
                <Breakdown filter={breakdown_filter} searchParams={params} />
            </section>
        </main>
    );
}
