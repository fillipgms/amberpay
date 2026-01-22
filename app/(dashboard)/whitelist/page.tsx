import WhitelistTable from "@/components/tables/WhitelistTable";
import { getIpWhitelist } from "@/actions/ip";
import PaginationControls from "@/components/Pagination";
import IpWhitelistHeader from "./IpWhitelistHeader";

export const dynamic = "force-dynamic";

export default async function IpWhitelistPage() {
    const whitelist = await getIpWhitelist();

    return (
        <main>
            <IpWhitelistHeader />

            <section className="py-8 px-8">
                <div className="page-content">
                    <WhitelistTable whitelist={whitelist.data} />
                    <PaginationControls
                        currentPage={whitelist.currentPage}
                        lastPage={whitelist.lastPage}
                        hasNextPage={whitelist.hasNextPage}
                        hasPrevPage={whitelist.hasPrevPage}
                        baseUrl="/whitelist"
                        searchParams={{}}
                    />
                </div>
            </section>
        </main>
    );
}
