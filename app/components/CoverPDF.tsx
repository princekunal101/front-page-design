"use client"; // if you’re using Next.js App Router

import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Member = {
    name: string;
    rollno: string;
};
type PreViewProps = {
    formData: {
        projectName: string,
        memberCount: string,
        members: Member[],
        // name: string,
        // rollno: string,
        department?: string,
        monthYear?: string,
        month?: string,
        year?: string,
        [key: string]: any,
    }
};



// Register Times New Roman
Font.register({
    family: "Times New Roman",
    fonts: [
        { src: `${PUBLIC_BASE}/fonts/TimesNewRomanRegular.ttf`, fontWeight: "normal" },
        { src: `${PUBLIC_BASE}/fonts/TimesNewRomanBold.ttf`, fontWeight: "bold" },

    ]
});

// Define styles
const styles = StyleSheet.create({
    container: { flexDirection: "column", justifyContent: "space-between", height: "100%", alignItems: "center" },
    page: { padding: 45, fontFamily: "Times New Roman", fontWeight: "normal" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
    subTitle: { fontSize: 18, textAlign: "center", margin: 4 },
    text: { fontSize: 14, textAlign: "center", margin: 4 },
    textBold: { fontSize: 16, textAlign: "center", margin: 4, fontWeight: "bold" },
});


// PDF component
export const MyPDF = ({ formData }: PreViewProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>

                <Text style={styles.title}>{formData.projectName}</Text>
                <Text style={styles.text}>by</Text>
                {formData.members.map((m, i) => (
                    <Text key={i} style={styles.text}>{m.name} ({m.rollno})</Text>
                ))}
                {/* <Text style={styles.text}>Prince Kunal (2200900100106)</Text> */}
                <View style={styles.text}></View>

                <Text style={styles.text}>Submitted to the Department of</Text>
                <Text style={styles.text}>{formData.department}</Text>
                <Text style={styles.text}>in partial fulfilment of the requirements</Text>
                <Text style={styles.text}>for the degree of</Text>
                <Text style={styles.textBold}>Bachlor of Technology</Text>
                <Text style={styles.textBold}>in</Text>

                <Text style={styles.textBold}>{formData.department}</Text>
                <View style={{ alignItems: "center", margin: 10 }}>
                    <Image src={`${PUBLIC_BASE}/iec-logo.jpg`} style={{ width: 80, height: 80 }} />
                </View>
                <Text style={styles.text}>IEC COLLEGE OF ENGINEERING & TECHNOLOGY</Text>
                <Text style={styles.text}>GREATER NOIDA, U.P.</Text>

                <View style={{ alignItems: "center", margin: 10 }}>
                    <Image src={`${PUBLIC_BASE}/aktu-logo.png`} style={{ width: 80, margin: 10 }} />
                </View>
                <Text style={styles.text}>DR. A. P. J. ABDUL KALAM TECHNICAL UNIVERSITY</Text>
                <Text style={styles.text}>LUCKNOW, U.P.</Text>
                <Text style={styles.text}>{formData.month}, {formData.year}</Text>
            </View>
        </Page>

    </Document>
);
