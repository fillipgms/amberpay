import { getCredentialsList } from "@/actions/credentials";
import CredentialCard from "@/components/CredentialCard";
import CreateCredentialModal from "./CreateCredentialModal";

export default async function CredentialsPage() {
    const credentialsData = await getCredentialsList({ page: 1 });

    return (
        <main>
            <section className="py-8 px-8 border-b-gradient flex items-center justify-between">
                <h1 id="pageTitle" className="font-bold text-2xl">
                    Credenciais
                </h1>
                <CreateCredentialModal />
            </section>

            <section className="space-y-4 p-8">
                {credentialsData.data.map((credential: any) => (
                    <CredentialCard
                        key={credential.id}
                        credential={credential}
                    />
                ))}
            </section>
        </main>
    );
}
