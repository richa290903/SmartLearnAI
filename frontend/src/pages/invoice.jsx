import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";

 function Invoice() {
  const invoiceRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const paymentId =
    params.get("payment_id") ||
    params.get("paymentId") ||
    params.get("id");

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Invoice
  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/payment/invoice/${paymentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setInvoice(null);
        else setInvoice(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [paymentId]);

// const downloadPDF = async () => {
//   try {
//     if (!invoiceRef.current) {
//       alert("Invoice not ready!");
//       return;
//     }

//     // Small delay to allow all rendering to complete
//     await new Promise((r) => setTimeout(r, 200));

//     // Clone only (DO NOT TOUCH REAL UI)
//     const original = invoiceRef.current;
//     const clone = original.cloneNode(true);

//     // CLEAN CLONE ONLY
//     const allElements = clone.querySelectorAll("*");
//     allElements.forEach((el) => {
//       // Remove Tailwind classes ONLY FROM CLONE
//       el.removeAttribute("class");

//       // Apply safe inline HEX colors
//       const style = window.getComputedStyle(el);
//       if (style.color.includes("oklch")) el.style.color = "#000000";
//       if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = "#ffffff";
//       if (style.borderColor.includes("oklch")) el.style.borderColor = "#cccccc";
//       if (style.boxShadow.includes("oklch")) el.style.boxShadow = "none";

//       // Remove gradients from clone
//       if (style.backgroundImage.includes("gradient")) {
//         el.style.backgroundImage = "none";
//         el.style.backgroundColor = "#ffffff";
//       }
//     });

//     // Clone wrapper styling
//     clone.style.background = "#ffffff";
//     clone.style.padding = "20px";
//     clone.style.width = original.offsetWidth + "px";

//     // Append clone offscreen
//     clone.style.position = "fixed";
//     clone.style.top = "-9999px";
//     document.body.appendChild(clone);

//     // Render CLEAN CLONE → CANVAS
//     const canvas = await html2canvas(clone, {
//       scale: 2,
//       backgroundColor: "#ffffff",
//       useCORS: true,
//       logging: false,
//     });

//     // Remove clone after render
//     document.body.removeChild(clone);

//     // Convert to PDF
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const imgWidth = 190;
//     const pageHeight = 297;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 10;

//     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = heightLeft - imgHeight + 10;
//       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save(`SmartLearnAI_Invoice_${paymentId}.pdf`);
//   } catch (error) {
//     console.error("PDF ERROR:", error);
//     alert("PDF failed");
//   }
// };

// const downloadPDF = async () => {
//   try {
//     if (!invoiceRef.current) {
//       alert("Invoice not ready!");
//       return;
//     }

//     // Wait for final DOM state
//     await new Promise((r) => setTimeout(r, 200));

//     // Create a fully isolated container (NOT connected to UI)
//     const isolatedContainer = document.createElement("div");
//     isolatedContainer.style.position = "fixed";
//     isolatedContainer.style.left = "-99999px"; // fully outside screen
//     isolatedContainer.style.top = "0";
//     isolatedContainer.style.background = "#fff";
//     isolatedContainer.style.zIndex = "-999999"; 
//     document.body.appendChild(isolatedContainer);

//     // Clone invoice inside isolated container
//     const clone = invoiceRef.current.cloneNode(true);
//     isolatedContainer.appendChild(clone);

//     // Clean ONLY clone (UI stays safe)
//     const all = clone.querySelectorAll("*");
//     all.forEach((el) => {
//       el.removeAttribute("class");

//       el.style.color = "#000";
//       el.style.backgroundColor = "#fff";
//       el.style.borderColor = "#ccc";
//       el.style.boxShadow = "none";

//       // Remove OKLCH gradients/colors
//       const computed = window.getComputedStyle(el);

//       if (computed.color.includes("oklch")) el.style.color = "#000000";
//       if (computed.backgroundColor.includes("oklch")) el.style.backgroundColor = "#ffffff";
//       if (computed.backgroundImage.includes("gradient")) {
//         el.style.backgroundImage = "none";
//         el.style.backgroundColor = "#ffffff";
//       }
//     });

//     // Render the isolated clone
//     const canvas = await html2canvas(clone, {
//       backgroundColor: "#ffffff",
//       scale: 2,
//       useCORS: true,
//       logging: false,
//     });

//     // Remove isolated container (UI restored completely)
//     document.body.removeChild(isolatedContainer);

//     // Convert to PDF
//     const img = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 190;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     const pageHeight = 297;

//     let heightLeft = imgHeight;
//     let position = 10;

//     pdf.addImage(img, "PNG", 10, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = heightLeft - imgHeight + 10;
//       pdf.addImage(img, "PNG", 10, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save(`SmartLearnAI_Invoice_${paymentId}.pdf`);
//   } catch (e) {
//     console.error("PDF ERROR:", e);
//     alert("PDF failed");
//   }
// };

const downloadPDF = async () => {
  try {
    if (!invoiceRef.current) {
      alert("Invoice not ready!");
      return;
    }

    await new Promise((r) => setTimeout(r, 300));

    // 🔥 Clone ONLY for fixing OKLCH (UI untouched)
    const clone = invoiceRef.current.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    // 🔥 Convert ONLY unsupported colors
    const all = clone.querySelectorAll("*");

    all.forEach((el) => {
      const computed = window.getComputedStyle(el);

      if (computed.color.includes("oklch")) {
        el.style.color = "#000000";
      }

      if (computed.backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
      }

      if (computed.borderColor.includes("oklch")) {
        el.style.borderColor = "#cccccc";
      }
    });

    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      backgroundColor: null
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 297;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    pdf.save(`SmartLearnAI_Invoice_${paymentId}.pdf`);
  } catch (error) {
    console.error("PDF ERROR:", error);
    alert("Download failed");
  }
};
  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading invoice...</p>
      </div>
    );
  }

  // Invalid Payment ID
  if (!paymentId) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <p className="text-red-600 text-lg">Invalid Payment ID</p>
      </div>
    );
  }

  // Invoice Not Found
  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Invoice Not Found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#2563eb] text-white px-6 py-2 rounded-lg hover:bg-[#1d4ed8]"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div
          className="text-white p-6"
          style={{
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">SmartLearnAI</h1>
              <p className="opacity-80">Professional Learning Platform</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">INVOICE</h2>
              <p className="opacity-80">#{invoice.payment_id}</p>
            </div>
          </div>
        </div>

        {/* Invoice Body */}
        <div ref={invoiceRef} id="invoice" className="p-8 bg-white">

          {/* Billing */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To:</h3>
              <div className="text-gray-700">
                <p className="font-medium text-lg">{invoice.user_name}</p>
                <p>{invoice.user_email}</p>
                {invoice.user_phone && <p>Phone: {invoice.user_phone}</p>}
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Details:</h3>
              <div className="text-gray-700">
                <p><b>Order ID:</b> {invoice.order_id}</p>
                <p><b>Date:</b> {new Date(invoice.date).toLocaleDateString()}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-[#d1fae5] text-[#065f46]"
                        : "bg-[#fef3c7] text-[#92400e]"
                    }`}
                  >
                    {invoice.status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Course */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Details</h3>
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-[#f9fafb] px-6 py-3 border-b border-gray-200 font-semibold grid grid-cols-3">
                <span>Description</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Amount</span>
              </div>
              <div className="px-6 py-4 grid grid-cols-3 items-center">
                <div>
                  <p className="font-medium">{invoice.course_name}</p>
                  <p className="text-sm text-gray-600">Course ID: {invoice.course_id}</p>
                  <p className="text-sm text-gray-600">Lifetime Access</p>
                </div>
                <div className="text-center">
                  <span className="bg-[#f3f4f6] px-3 py-1 rounded-full">1</span>
                </div>
                <div className="text-right font-semibold">
                  ₹{invoice.amount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-6">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>₹{invoice.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between py-2 border-t font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-[#059669]">₹{invoice.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t text-center text-gray-600">
            <p className="text-sm">Thank you for choosing SmartLearnAI!</p>
            <p className="text-xs">This is a computer-generated invoice.</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="bg-[#f9fafb] px-8 py-6 flex justify-center gap-4">
          {/* <button
            onClick={downloadPDF}
            className="bg-[#2563eb] text-white px-8 py-3 rounded-lg"
          >
            Download PDF
          </button> */}
            
 {/* Buttons */}
<div className="bg-[#f9fafb] px-8 py-6 flex justify-center gap-6">

  {/* Download Button */}
  <button
    onClick={downloadPDF}
    className="relative overflow-hidden bg-gradient-to-r from-[#2563eb] to-[#7c3aed] 
               text-white px-8 py-3 rounded-xl font-semibold 
               shadow-md hover:shadow-xl 
               transform hover:-translate-y-1 hover:scale-105 
               transition-all duration-300 ease-in-out"
  >
    <span className="relative z-10"> Download PDF</span>

    {/* Shine Animation */}
    <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition duration-300"></span>
  </button>

  {/* Optional Secondary Button */}
  <button
    onClick={() => navigate("/my_course")}
    className="border border-[#2563eb] text-[#2563eb] px-8 py-3 rounded-xl font-semibold
               hover:bg-[#2563eb] hover:text-white 
               transform hover:-translate-y-1 hover:scale-105
               transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg"
  >
   Go to My Courses
  </button>

</div>
        </div>

      </div>
    </div>
  );
}export default Invoice;