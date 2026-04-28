"use client"

import { useState } from "react";

import Form from "./form";
import Head from "next/head";


export default function Home() {
  const [formData, setFormData] = useState({
    projectName: "",
    memberCount: "1",
    members: [{ name: "", rollno: "" }],
    // name: "",
    // rollno: "",
    department: "Computer Science and Engineering",
    monthYear: "2026-05",
    month: "May",
    year: "2026",
  });

  return (<>

    <Head>
      <link rel="preload" as="image" href="/iec-logo.jpg" />
      <link rel="preload" as="image" href="/aktu-logo.png" />
    </Head>
    <div className="min-h-screen flex justify-center items-center lg:flex-row ">
      <Form formData={formData} setFormData={setFormData} />
      {/* <Preview formData={formData} /> */}
    </div>
  </>
  );
}