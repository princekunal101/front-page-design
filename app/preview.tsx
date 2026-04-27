"use client"


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


export default function Preview({ formData }: PreViewProps) {
    return (
         <div>
            {/* A4 Preview Canvas */}
            <div
                id="previewz"
                className="mt-8 bg-white w-[210mm] h-[297mm] px-10 py-16 shadow-lg relative flex justify-center items-center font-times"
                // style={{zoom: 0.3}}
            >
                <div className="flex flex-col items-center justify-between h-full gap-2">
                    {/* <h1 className="text-3xl font-bold">Travel Planner App Using AI</h1> */}
                    <h1 className="text-3xl font-bold">{formData.projectName}</h1>
                    {/* <div className="bg-white p-4 shadow-md w-1/2 text-center">
          </div> */}
                    <p className="text-lg font-times">by</p>

                    {formData.members.map((m, i) => (
                        <p key={i} className="text-xl font-times">{m.name} ({m.rollno})</p>
                    ))}
                    {/* <p className="text-xl font-times">Rohit Varshney (2100900100081)</p>
          <p className="text-xl font-times">Rohit Varshney (2100900100081)</p> */}
                    {/* <p className="text-xl font-times">Rohit Varshney (2100900100081)</p> */}
                    {/* <p className="text-xl font-times">Rohit Varshney (2100900100081)</p> */}
                    <div className="h-2"></div>
                    {/* <p> a</p> */}
                    <p className="text-xl font-times">Submitted to the Department of</p>
                    {/* <p className="text-xl font-times">Computer Science and Engineering</p> */}
                    <p className="text-xl font-times">{formData.department}</p>
                    <p className="text-xl font-times">in partial fulfilment of the requirements</p>
                    <p className="text-xl font-times">for the degree of</p>
                    <p className="text-xl font-bold font-times">Bachlor of Technology</p>
                    <p className="text-lg font-bold font-times">in</p>
                    {/* <p className="text-xl font-bold font-times">Computer Science and Engineering</p> */}
                    <p className="text-xl font-bold font-times">{formData.department}</p>

                    <img
                        src="/iec-logo.jpg"
                        alt="Logo"
                        className=" m-2 w-30 h-30 object-contain"
                    />

                    <p className="text-xl font-times">IEC COLLEGE OF ENGINEERING & TECHNOLOGY</p>
                    <p className="text-xl font-times">GREATER NOIDA, U.P.</p>
                    <img
                        src="/aktu-logo.png"
                        alt="Logo"
                        className="m-2 w-30 h-30 object-contain"
                    />
                    <p className="text-xl font-times">DR. A. P. J. ABDUL KALAM TECHNICAL UNIVERSITY</p>
                    <p className="text-xl font-times">LUCKNOW, U.P.</p>
                    {/* <p className="text-lg font-times">May, 2026</p> */}
                    <p className="text-lg font-times">{formData.month}, {formData.year}</p>

                    {/*             
          <div className="bg-white p-4 shadow-md w-1/2 text-center mt-4">
            <p className="text-lg font-times">Row 2: Centered</p>
          </div>
          <div className="bg-white p-4 shadow-md w-1/2 text-center mt-4">
            <p className="text-lg font-times">Row 3: Centered</p>
          </div>

          <img
            src="/aktu-logo.png"
            alt="Logo"
            className="absolute top-4 right-4 w-24 h-24 object-contain"
          />
          <h1 className="text-2xl font-bold mb-6">Student Information</h1>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Roll No:</strong> {formData.rollno}</p>
          <p><strong>Department:</strong> {formData.department}</p>
          <p><strong>Date:</strong> {formData.date}</p> */}
                </div>
            </div>
         </div>
    );
}
