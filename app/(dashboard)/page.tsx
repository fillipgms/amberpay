import { GetDashboardData } from "@/actions/dashboard";
import DashboardClient from "./DashboardClient";

export default async function Home() {
    const homeData = await GetDashboardData();

    return <DashboardClient homeData={homeData} />;
}
