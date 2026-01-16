import CredentialCard from "@/components/CredentialCard";
import { Button } from "@/components/ui/button";

export default function CredentialsPage() {
    return (
        <main>
            <section className="py-8 px-8 border-b-gradient flex items-center justify-between">
                <h1 className="font-bold text-2xl">Credenciais</h1>
                <Button>Criar</Button>
            </section>

            <section className="space-y-4 p-8">
                <CredentialCard title="Meu Site de Vendas" />
            </section>
        </main>
    );
}
