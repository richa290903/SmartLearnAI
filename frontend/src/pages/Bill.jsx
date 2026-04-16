import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const BillPage = () => {
  const { state } = useLocation();

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Payment Receipt", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Course: ${state.title}`, 20, 40);
    pdf.text(`Base Price: ₹${state.basePrice}`, 20, 50);
    pdf.text(`GST (18%): ₹${state.gstAmount.toFixed(2)}`, 20, 60);
    pdf.text(`Total: ₹${state.totalAmount.toFixed(2)}`, 20, 70);
    pdf.text(`Payment Method: ${state.method}`, 20, 80);
    pdf.text(`Transaction ID: TXN${Date.now()}`, 20, 90);

    pdf.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-xl">

        <h1 className="text-2xl font-semibold mb-4">Payment Successful ✔</h1>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border mb-4">
          <p>Course: <b>{state.title}</b></p>
          <p>Base Price: ₹{state.basePrice}</p>
          <p>GST: ₹{state.gstAmount.toFixed(2)}</p>
          <p>Total Paid: <b>₹{state.totalAmount.toFixed(2)}</b></p>
          <p>Method: {state.method}</p>
        </div>

        <button
          onClick={downloadPDF}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-lg"
        >
          Download PDF Invoice
        </button>
      </div>
    </div>
  );
};

export default BillPage;