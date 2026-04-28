"use client";


import { useState } from "react";
import Form from "./form";


export default function Home() {
    const [formData, setFormData] = useState({
    projectName: "",
    memberCount: "1",
    members: [{ name: "", rollno: "" }],
    department: "Computer Science and Engineering",
    monthYear: "2026-05",
    month: "May",
    year: "2026",
  });


  return (
    <div>

      {/* Download link
      <PDFDownloadLink document={<MyPDF formData={formData}/>} fileName="invoice.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink> */}

      <Form formData={formData} setFormData={setFormData} />
      {/* Inline viewer */}
      {/* <div style={{ height: "600px", marginTop: "20px" }}>
        <PDFViewer width="100%" height="100%">
          <MyPDF formData={formData}/>
        </PDFViewer>
      </div> */}
    </div>
  );
}