import { GetDashboardData } from "@/actions/dashboard";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function Home() {
    const homeData = await GetDashboardData();

    return <DashboardClient homeData={homeData} />;
}
