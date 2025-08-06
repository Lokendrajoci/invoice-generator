import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BillingForm from "./components/BillingForm";
import Item from "./components/Item";
import { CounterProvider } from "/src/context/Context";

function App() {
  const [tAmout, setTamout] = useState(0);
  const [DAmout, setDamout] = useState(0);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, price: 0 },
  ]);
  const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <CounterProvider>
        <div className="w-screen bg-customTomato flex justify-center gap-6">
          <div className="w-7/12 bg-whiteColor mt-8 rounded-lg">
            <Navbar formattedDate={formattedDate} />
            <BillingForm />
            <Item
              items={items}
              setItems={setItems}
              tAmout={tAmout}
              setTamout={setTamout}
              DAmout={DAmout}
              setDamout={setDamout}
              sum={sum}
            />
          </div>
          <div className="w-64 h-72 mt-8">
            <Sidebar
              items={items}
              dateOfIssue={formattedDate}
              tAmout={tAmout}
              DAmout={DAmout}
              subTotal={sum}
            />
          </div>
        </div>
      </CounterProvider>
    </>
  );
}

export default App;
