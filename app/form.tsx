"use client"

import { useState } from "react";
import { MyPDF } from "./components/CoverPDF";
import dynamic from "next/dynamic";


const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

type Member = {
    name: string;
    rollno: string;
};

type FormProps = {
    formData: {
        projectName: string,
        memberCount: string,
        members: Member[],

        department: string,
        monthYear: string,
        month: string,
        year: string,
        [key: string]: any; // allows dynamic keys like member1Name
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};


export default function Form({ formData, setFormData }: FormProps) {


    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    // prefix for public assets when deployed under a basePath (e.g. GitHub Pages)
    const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

    // Define a mapping from short code to full name
    const departmentMap: Record<string, string> = {
        CSE: "Computer Science and Engineering",
        IT: "Information Technology",
        ECE: "Electronics and Communication Engineering",
        ME: "Mechanical Engineering",
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "monthYear") {
            // value looks like "2026-04"
            const [year, month] = value.split("-");
            // Convert month number to full month name
            const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString("default", { month: "long" });

            setFormData({
                ...formData,
                monthYear: value,       // raw value
                month: monthName,       // "April"
                year: year,             // "2026"
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

    };

    // ✅ Helper: check required fields
    const isFormComplete = () => {
        if (!formData.projectName || !formData.department || !formData.month || !formData.year) {
            return false;
        }
        // Check members
        for (const m of formData.members) {
            if (!m.name || !m.rollno) return false;
        }
        return true;
    };

    // Utility: wait until one image is loaded
    const waitForImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;

            if (img.complete) {
                resolve(img); // already cached
            } else {
                img.onload = () => resolve(img);
                img.onerror = reject;
            }
        });
    };

    // for handling image loading
    const handleDownload = async () => {

        setLoading(true);

        try {
            // Wait for both images in parallel
            const [iecLogo, aktuLogo] = await Promise.all([
                waitForImage(`${PUBLIC_BASE}/iec-logo.jpg`),
                waitForImage(`${PUBLIC_BASE}/aktu-logo.png`),
            ]);

            // Both images are ready, now safe to generate PDF
            downloadPDF();

        } catch (err) {
            console.error("One or more images failed to load", err);
        } finally {
            setLoading(false);
        }
    }

    const downloadPDF = async () => {
        if (!isFormComplete()) {
            alert("Please fill all required fields before downloading.");
            return;
        }


        // setShowPreview(true);
        // await new Promise((resolve) => setTimeout(resolve, 300));

        // const element = document.getElementById("preview");
        // if (!element) return;
        // const pdf = new jsPDF("p", "mm", "a4");
        // pdf.html(element, {
        //     callback: (doc) => {
        //         doc.save("project-front-page.pdf");
        //     },
        //     x: 10,
        //     y: 8,
        //     width: 190,       // keep within A4 width
        //     windowWidth: 794, // match CSS A4 width in px
        //     autoPaging: "text",
        // });

        // const canvas = await html2canvas(element, { scale: 2 });
        // const imgData = canvas.toDataURL("image/png");
        // const pdf = new jsPDF("p", "mm", "a4");
        // const width = 210;
        // const height = (canvas.height * width) / canvas.width;
        // pdf.addImage(imgData, "PNG", 0, 0, width, height);
        // pdf.save("project-front-page.pdf");


        // setShowPreview(false);

    };

    return (
        <div className={`min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6`}>
            {/* Form */}
            <form className="w-full max-w-md bg-white dark:bg-zinc-700 p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium">Project Name (only for IECns)</label>
                    <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="The Project Name"
                        className="mt-1 w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>

                    <label className="block text-sm font-medium">Choose Member Count</label>
                    <div className="flex gap-4 mt-2">

                        {[1, 2, 3, 4].map((count) => (
                            <label key={count}>
                                <input
                                    type="radio"
                                    name="memberCount"
                                    value={count}
                                    checked={formData.memberCount === String(count)}
                                    onChange={handleChange}
                                    className="mr-1"
                                    required
                                />
                                {count}
                            </label>
                        ))}
                    </div>
                </div>
                {Array.from({ length: parseInt(formData.memberCount || "1") }, (_, i) => (
                    <div key={i} className="mb-4">
                        <label className="block text-sm font-medium">Student {i + 1} Name</label>
                        <input
                            type="text"
                            name={`member${i + 1}Name`}
                            value={formData.members[i]?.name || ""}
                            onChange={(e) => {
                                const updated = [...formData.members];
                                updated[i] = { ...updated[i], name: e.target.value };
                                setFormData({ ...formData, members: updated });
                            }}
                            placeholder={`Student Name ${i + 1}`}
                            className="mt-1 w-full border rounded-md p-2"
                            required
                        />

                        <label className="block text-sm font-medium mt-2">Student {i + 1} Roll No</label>
                        <input
                            type="text"
                            name={`member${i + 1}Rollno`}
                            value={formData.members[i]?.rollno || ""}
                            onChange={(e) => {
                                const updated = [...formData.members];
                                updated[i] = { ...updated[i], rollno: e.target.value };
                                setFormData({ ...formData, members: updated });
                            }}
                            placeholder={`Student Rollno ${i + 1}`}
                            className="mt-1 w-full border rounded-md p-2"
                            required
                        />
                    </div>
                ))}

            
                <div>
                    <label className="block text-sm font-medium">Department</label>
                    <div className="flex gap-4 mt-2">
                        {Object.keys(departmentMap).map((dept) => (
                            <label key={dept}>
                                <input
                                    type="radio"
                                    name="department"
                                    value={departmentMap[dept]}
                                    checked={formData.department === departmentMap[dept]}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                {dept}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="month"
                        name="monthYear"
                        value={formData.monthYear}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded-md p-2"
                    />
                </div>


                <button
                    type="submit"
                    onClick={handleDownload}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    disabled={loading}
                >
                {/* Download link */}
                <PDFDownloadLink document={<MyPDF formData={formData} />} fileName="project-front-page.pdf">
                    {({ loading }) => (loading ? "Loading..." : "Download PDF")}
                </PDFDownloadLink>
                </button>
            </form>


            {/* {!showPreview && (<div
                id="preview"
                className="mt-8 bg-white w-[210mm] h-[297mm] px-10 py-10 shadow-lg relative flex justify-center items-center dark:text-black"
                style={{ fontFamily: "var(--font-myfont)" }}
            >
                <div className="flex flex-col items-center justify-between h-full gap-2">
                    <h1 className="text-3xl font-bold">{formData.projectName}</h1>

                    <p className="text-lg">by</p>

                    {formData.members.map((m, i) => (
                        <p key={i} className="text-xl">{m.name} ({m.rollno})</p>
                    ))}
                    <div className="h-2"></div>

                    <p className="text-xl ">Submitted to the Department of</p>
                    <p className="text-xl ">{formData.department}</p>
                    <p className="text-xl ">in partial fulfilment of the requirements</p>
                    <p className="text-xl ">for the degree of</p>
                    <p className="text-xl font-bold">Bachlor of Technology</p>
                    <p className="text-lg font-bold">in</p>
                    <p className="text-xl font-bold">{formData.department}</p>

                    <img
                        src={`${PUBLIC_BASE}/iec-logo.jpg`}
                        alt="Logo"
                        className=" m-2 w-30 h-30 object-contain"
                    />

                    <p className="text-xl">IEC COLLEGE OF ENGINEERING & TECHNOLOGY</p>
                    <p className="text-xl">GREATER NOIDA, U.P.</p>
                    <img
                        src={`${PUBLIC_BASE}/aktu-logo.png`}
                        alt="Logo"
                        className="m-2 w-30 h-30 object-contain"
                    />
                    <p className="text-xl">DR. A. P. J. ABDUL KALAM TECHNICAL UNIVERSITY</p>
                    <p className="text-xl">LUCKNOW, U.P.</p>
                    <p className="text-lg">{formData.month}, {formData.year}</p>

                </div>
            </div>)} */}

            {/* {showPreview && <Preview formData={formData}/>} */}
        </div>);
}