import { useContext } from "react";
import { FaPercent } from "react-icons/fa6";
import { counterContext } from "/src/context/context";
import { VALIDATION_TYPES } from "/src/context/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PropTypes from "prop-types";
export default function Sidebar(props) {
  const value = useContext(counterContext);

  const handleDownload = () => {
    // Check if there are any validation errors
    const hasErrors = Object.keys(value.errors).length > 0;
    const hasRequiredFields =
      value.Tinvoice && value.Finvoice && value.Temail && value.Femail;

    if (hasErrors) {
      alert("Please fix all validation errors before downloading the invoice.");
      return;
    }

    if (!hasRequiredFields) {
      alert(
        "Please fill in all required fields before downloading the invoice."
      );
      return;
    }

    const doc = new jsPDF();
    console.log(props);

    const title = "xyz";
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text(title, 15, 20);
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text(`Invoice #: ${value.invoice}`, 15, 28);
    doc.setTextColor("#507687");
    doc.setFontSize(16);
    doc.text(`Amount Due:`, 160, 20);
    doc.setFontSize(20);
    doc.setTextColor("#4CAF50");
    doc.text(`$ ${props.subTotal.toFixed(2)}`, 160, 30);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.setFont("Helvetica", "bold");
    doc.text("Billed to:", 15, 45);
    doc.text("Billed From:", 120, 45);
    doc.text("Date Of Issue:", 120, 75);

    doc.setFont("Helvetica", "normal");
    doc.text(value.Tinvoice, 15, 50);
    doc.text(value.Tadress, 15, 55);
    doc.text(value.Temail, 15, 60);

    doc.text(value.Finvoice, 120, 50);
    doc.text(value.Fadress, 120, 55);
    doc.text(value.Femail, 120, 60);

    doc.text(props.dateOfIssue, 120, 80);

    const itemsData = props.items.map((item) => [
      item.quantity,
      item.description,
      `$ ${parseFloat(item.price).toFixed(2)}`,
      `$ ${(item.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["QTY", "DESCRIPTION", "PRICE", "AMOUNT"]],
      body: itemsData,
      startY: 90,
      margin: { left: 15, right: 15 },
      theme: "grid",
    });

    const finalY = doc.autoTable.previous.finalY + 10;

    doc.text("SUBTOTAL", 140, finalY);
    doc.text(`$ ${props.subTotal.toFixed(2)}`, 170, finalY);
    doc.text("TAX", 140, finalY + 10);
    doc.text(`$ ${props.tAmout.toFixed(2)}`, 170, finalY + 10);
    doc.text("DISCOUNT", 140, finalY + 20);
    doc.text(`$ ${props.DAmout.toFixed(2)}`, 170, finalY + 20);
    doc.setFont("Helvetica", "bold");
    doc.text("TOTAL", 140, finalY + 30);
    doc.text(
      `$ ${(props.subTotal + props.tAmout - props.DAmout).toFixed(2)}`,
      170,
      finalY + 30
    );

    doc.save("invoice.pdf");
  };
  const handleChangeTax = (e) => {
    const inputValue = e.target.value;
    value.setTax(inputValue);
    value.validateField("tax", inputValue, VALIDATION_TYPES.TAX_RATE);
  };

  const handleChangeDiscount = (e) => {
    const inputValue = e.target.value;
    value.setDiscount(inputValue);
    value.validateField("discount", inputValue, VALIDATION_TYPES.DISCOUNT_RATE);
  };
  return (
    <>
      <div>
        <div>
          <button
            className="bg-blue-400 w-full h-12 rounded-lg text-white font-bold text-sm hover:bg-blue-500 "
            onClick={handleDownload}
          >
            Download
          </button>
          <hr className="border-t-2 border-hrColor  my-2" />
        </div>
        <div className="mb-8">
          <label htmlFor="" className="text-base font-semibold">
            Tax rate:
          </label>
          <div
            className={`flex items-center border-2 rounded-md ${
              value.errors.tax ? "border-red-500" : "border-borderBlack"
            }`}
          >
            <input
              type="number"
              id="tax"
              name="tax"
              className={`bg-white h-8 p-2 border border-semiBlack rounded-md focus:outline-none focus:ring-2 ${
                value.errors.tax
                  ? "focus:border-red-600 focus:ring-red-400"
                  : "focus:border-blue-400 focus:ring-blue-400"
              }`}
              placeholder="0.0"
              min="0"
              max="100"
              step="0.1"
              onChange={handleChangeTax}
            />
            <div className="pl-5">
              <FaPercent className="text-blackPercent text- " />
            </div>
          </div>
          {value.errors.tax && (
            <p className="text-red-500 text-xs mt-1">{value.errors.tax}</p>
          )}
        </div>
        <div>
          <label htmlFor="" className="text-base font-semibold">
            Discount rate:
          </label>
          <div
            className={`flex items-center border-2 rounded-md ${
              value.errors.discount ? "border-red-500" : "border-borderBlack"
            }`}
          >
            <input
              type="number"
              id="discount"
              name="discount"
              className={`bg-white h-8 p-2 border border-semiBlack rounded-md focus:outline-none focus:ring-2 ${
                value.errors.discount
                  ? "focus:border-red-600 focus:ring-red-400"
                  : "focus:border-blue-400 focus:ring-blue-400"
              }`}
              placeholder="0.0"
              min="0"
              max="100"
              step="0.1"
              onChange={handleChangeDiscount}
            />
            <div className="pl-5">
              <FaPercent className="text-blackPercent text- " />
            </div>
          </div>
          {value.errors.discount && (
            <p className="text-red-500 text-xs mt-1">{value.errors.discount}</p>
          )}
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  dateOfIssue: PropTypes.string.isRequired,
  tAmout: PropTypes.number.isRequired,
  DAmout: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
};
