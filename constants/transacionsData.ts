export const transactionsData = [
    {
        id: "tx_1A2B3C",
        date: "2025-01-14T10:32:15Z",
        customer: {
            name: "João Silva",
            email: "joao.silva@email.com",
        },
        paymentMethod: {
            type: "credit_card",
            brand: "Visa",
            last4: "4242",
        },
        amount: 199.9,
        currency: "BRL",
        status: "succeeded",
        merchant: "Loja Central",
        fees: 5.32,
    },
    {
        id: "tx_9F8E7D",
        date: "2025-01-14T11:05:44Z",
        customer: {
            name: "Maria Oliveira",
            email: "maria.oliveira@email.com",
        },
        paymentMethod: {
            type: "pix",
        },
        amount: 59.0,
        currency: "BRL",
        status: "pending",
        merchant: "Loja Central",
        fees: 1.2,
    },
    {
        id: "tx_4G5H6J",
        date: "2025-01-13T18:21:10Z",
        customer: {
            name: "Pedro Santos",
            email: "pedro.santos@email.com",
        },
        paymentMethod: {
            type: "credit_card",
            brand: "Mastercard",
            last4: "7788",
        },
        amount: 350.0,
        currency: "BRL",
        status: "failed",
        merchant: "Loja Secundária",
        fees: 0,
    },
    {
        id: "tx_7K8L9M",
        date: "2025-01-12T09:14:02Z",
        customer: {
            name: "Ana Costa",
            email: "ana.costa@email.com",
        },
        paymentMethod: {
            type: "boleto",
        },
        amount: 120.5,
        currency: "BRL",
        status: "succeeded",
        merchant: "Loja Central",
        fees: 3.1,
    },
    {
        id: "tx_2Q3W4E",
        date: "2025-01-11T16:48:33Z",
        customer: {
            name: "Lucas Pereira",
            email: "lucas.pereira@email.com",
        },
        paymentMethod: {
            type: "credit_card",
            brand: "Elo",
            last4: "9911",
        },
        amount: 89.9,
        currency: "BRL",
        status: "refunded",
        merchant: "Loja Central",
        fees: 2.4,
    },
];
