import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { Transaction } from "../tables/TransactionsTable";
import logo from "@/public/logos/icon.png";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: "#ffffff",
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 30,
        borderBottom: "2pt solid #59c380",
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 11,
        color: "#666666",
    },
    statusSection: {
        backgroundColor: "#f0fdf4",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: "4pt solid #59c380",
    },
    statusText: {
        fontSize: 12,
        color: "#166534",
        fontWeight: "bold",
        marginBottom: 8,
    },
    statusDate: {
        fontSize: 10,
        color: "#4b5563",
    },
    infoSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 12,
        borderBottom: "1pt solid #e5e7eb",
        paddingBottom: 6,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        fontSize: 10,
        color: "#6b7280",
        width: "40%",
        fontWeight: "bold",
    },
    value: {
        fontSize: 10,
        color: "#1a1a1a",
        width: "60%",
    },
    valueHighlight: {
        fontSize: 14,
        color: "#059669",
        fontWeight: "bold",
        width: "60%",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 9,
        color: "#9ca3af",
        borderTop: "1pt solid #e5e7eb",
        paddingTop: 15,
    },
    divider: {
        marginVertical: 15,
        borderBottom: "1pt solid #e5e7eb",
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
});

interface TransactionReceiptProps {
    transaction: Transaction;
    bankId?: string;
}

export const TransactionReceipt = ({
    transaction,
    bankId = "—",
}: TransactionReceiptProps) => {
    const formatStatus = (status: string) => {
        const statusMap: Record<string, string> = {
            Aprovada: "REALIZADO",
            Pendente: "PENDENTE",
            Recusada: "RECUSADO",
        };
        return statusMap[status] || status.toUpperCase();
    };

    const getStatusColor = (status: string) => {
        if (status === "Aprovada")
            return { bg: "#f0fdf4", text: "#166534", border: "#59c380" };
        if (status === "Pendente")
            return { bg: "#eff6ff", text: "#1e40af", border: "#3b82f6" };
        return { bg: "#fef2f2", text: "#991b1b", border: "#ef4444" };
    };

    const statusColor = getStatusColor(transaction.status);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        {/* <Image style={styles.logo} src={logo.src} /> */}
                        <Text style={styles.title}>EmberPay</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        Comprovante de Transação
                    </Text>
                </View>

                {/* Status Section */}
                <View
                    style={[
                        styles.statusSection,
                        {
                            backgroundColor: statusColor.bg,
                            borderLeft: `4pt solid ${statusColor.border}`,
                        },
                    ]}
                >
                    <Text
                        style={[styles.statusText, { color: statusColor.text }]}
                    >
                        STATUS: {formatStatus(transaction.status)}
                    </Text>
                    <Text style={styles.statusDate}>
                        REALIZADO EM: {transaction.created_at}
                    </Text>
                </View>

                {/* Transaction Details */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>
                        Detalhes da Transação
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>VALOR:</Text>
                        <Text style={styles.valueHighlight}>
                            {transaction.amount}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>TIPO DE TRANSFERÊNCIA:</Text>
                        <Text style={styles.value}>PIX</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>TIPO:</Text>
                        <Text style={styles.value}>{transaction.type}</Text>
                    </View>
                    {transaction.fee && transaction.fee !== "R$ 0,00" && (
                        <View style={styles.row}>
                            <Text style={styles.label}>TAXA:</Text>
                            <Text style={styles.value}>{transaction.fee}</Text>
                        </View>
                    )}
                </View>

                {/* Payer Information */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>
                        Dados do Depositante
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>NOME DO DEPOSITANTE:</Text>
                        <Text style={styles.value}>
                            {transaction.payer.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            {transaction.payer.document.length > 14
                                ? "CNPJ:"
                                : "CPF:"}
                        </Text>
                        <Text style={styles.value}>
                            {transaction.payer.document}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>BANCO:</Text>
                        <Text style={styles.value}>
                            {transaction.origin || "—"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>CONTA:</Text>
                        <Text style={styles.value}>
                            {transaction.payer.account}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>AGÊNCIA:</Text>
                        <Text style={styles.value}>
                            {transaction.payer.agency}
                        </Text>
                    </View>
                </View>

                {/* Recipient Information */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Dados do Favorecido</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>NOME DO FAVORECIDO:</Text>
                        <Text style={styles.value}>
                            {transaction.credential_description || "—"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>CHAVE PIX:</Text>
                        <Text style={styles.value}>
                            {transaction.payer.pixKey}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>BANCO:</Text>
                        <Text style={styles.value}>
                            {transaction.application || "—"}
                        </Text>
                    </View>
                </View>

                {/* IDs Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Identificação</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>ID DA TRANSAÇÃO:</Text>
                        <Text style={[styles.value, { fontFamily: "Courier" }]}>
                            {transaction.id}
                        </Text>
                    </View>
                    {bankId && bankId !== "—" && (
                        <View style={styles.row}>
                            <Text style={styles.label}>ID BANCÁRIO:</Text>
                            <Text
                                style={[
                                    styles.value,
                                    { fontFamily: "Courier" },
                                ]}
                            >
                                {bankId}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>
                        Este comprovante é válido como recibo de transação
                        realizada através da plataforma AmberPay.
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                        Gerado em: {new Date().toLocaleString("pt-BR")}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};
