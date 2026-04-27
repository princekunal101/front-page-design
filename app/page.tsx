"use client"

import { useState } from "react";

import Form from "./form";


export default function Home() {
  const [formData, setFormData] = useState({
    projectName: "",
    memberCount: "1",
    members: [{ name: "", rollno: "" }],
    name: "",
    rollno: "",
    department: "",
    monthYear: "",
    month: "",
    year: "",
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6">
      <Form formData={formData} setFormData={setFormData} />
      {/* <Preview formData={formData} /> */}
    </div>
  );
}