interface LoginResponse {
    status: boolean;
    user: User | null;
    msg: string;
    token: string | null;
    qrcode: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
    document: string;
    email_verified_at: string | null;
    latest_ip: string | null;
    phone: string;
    birth_date: string;
    veriff_session_id: string;
    google2fa_secret: string;
    verify_google2fa: "1" | "0";
    type: string;
    auto_approve_withdrawal: boolean;
    enabled_withdraw: boolean;
    enabled_deposit: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    approved_account: boolean;
    veriff_enabled: boolean;
    view_user_admin: ViewUserAdmin;
    view_user_approve: ViewUserApprove;
    wallet: UserWallet;
}

interface ViewUserAdmin {
    id: number;
    name: string;
    email: string;
    document: string;
    birth_date: string;
    phone: string;
    enabled_withdraw: boolean;
    enabled_deposit: boolean;
    auto_approve_withdrawal: boolean;
    type: string;
    latest_ip: string | null;
    balance: string;
    blocked_balance: string;
    total_in: string;
    total_out: string;
    created_at: string;
}

interface ViewUserApprove {
    id: number;
    name: string;
    email: string;
    document: string;
    type: string;
    veriff_enabled: boolean;
    adress: UserAdress;
    created_at: string;
}

interface UserAdress {
    id: number;
    userId: number;
    bairro: string;
    numero: string;
    logradouro: string;
    cep: string;
    cidade: string;
    complemento: string | null;
    estado: string;
    created_at: string;
    updated_at: string;
}

interface UserWallet {
    id: number;
    userId: number;
    balance: string;
    blocked_balance: string;
    total_in: string;
    total_out: string;
    locked: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface SessionPayload {
    accessToken: string;
    expires: string;
}

interface HomeData {
    available_balance: string;
    blocked_balance: string;
    today_sales: string;
    today_outflows: string;
    sales_count: string;
    outflows_count: string;
    last_7_days: Last7Days[];
}

interface Last7Days {
    date: string;
    sales: number;
    outflows: number;
}

interface Transacion {
    index: number;
    amount: string;
    date: string;
    business: string;
    type: string;
}

interface CredentialProps {
    id: number;
    user_id: number;
    client_id: string;
    client_secret: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface MeProps {
    name: string;
    email: string;
    cpfOrCnpj: string;
    auto_approve_withdrawal: boolean;
    enabled_withdraw: boolean;
    enabled_deposit: boolean;
    balance: string;
    fee: FeeProps;
}

interface FeeProps {
    limit_withdrawal: string;
    limit_per_day_withdrawal_user: number;
    limit_per_day_withdrawal: number;
    minimum_withdrawal: string;
    minimum_deposit: string;
    max_deposit: string;
    max_deposit_per_day: number;
    fee_percent_withdrawal: string;
    fee_percent_deposit: string;
    fee_percent_withdrawal_fixed: string;
    fee_fixed_deposit: string;
}
