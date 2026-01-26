export default function formatCurrency(val: number): string {
    return val.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
