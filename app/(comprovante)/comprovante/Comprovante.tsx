import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

const comprovante = () => {
    return (
        <Document>
            <Page
                size="A4"
                style={{
                    margin: 10,
                    padding: 10,
                    flexGrow: 1,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        src="/logos/icon.png"
                        style={{
                            width: "50px",
                        }}
                    />
                </View>
            </Page>
        </Document>
    );
};

export default comprovante;
