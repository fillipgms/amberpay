import RegisterClient from "./RegisterClient";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string }>;
}) {
    const params = await searchParams;

    const { name, email, password } = params;

    return (
        <RegisterClient
            defaultName={name}
            defaultEmail={email}
            defaultPassword={password}
        />
    );
}
