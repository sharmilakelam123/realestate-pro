import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "buyers";
  const activeTool = searchParams.get("tool") || "emi";

  const setTabAndTool = (tab, tool) => {
    setSearchParams({ tab, tool });
  };

  // EMI
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;

    const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    const totalInt = totalPay - P;

    setEmi(Math.round(emiCalc) || 0);
    setTotalPayment(Math.round(totalPay) || 0);
    setTotalInterest(Math.round(totalInt) || 0);
  }, [loanAmount, interestRate, loanTenure]);

  const RATES_DATA = {
    Visakhapatnam: [
      { locality: "Madhurawada", rate: "₹5,350/sqft", trend: "+7%" },
      { locality: "Yendada", rate: "₹5,800/sqft", trend: "+8%" }
    ],
    Srikakulam: [
      { locality: "Balaga", rate: "₹2,800/sqft", trend: "+4%" }
    ]
  };

  return (
    <div style={{ maxWidth: 1200, margin: "30px auto" }}>

      <h2>Services Page</h2>

      {/* EMI */}
      {activeTab === "buyers" && activeTool === "emi" && (
        <div>
          <h3>EMI Calculator</h3>

          <input type="range"
            min="500000"
            max="20000000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />

          <p>EMI: ₹{emi}</p>
          <p>Total Interest: ₹{totalInterest}</p>
          <p>Total Payment: ₹{totalPayment}</p>
        </div>
      )}

      {/* Rates */}
      {activeTab === "buyers" && activeTool === "rates" && (
        <div>
          <h3>Rates</h3>
          {Object.keys(RATES_DATA).map(city => (
            <div key={city}>
              <h4>{city}</h4>
              {RATES_DATA[city].map((p) => (
                <p key={p.locality}>
                  {p.locality} - {p.rate} ({p.trend})
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/* ---------------- VALUATION COMPONENT ---------------- */

function ValuationCalculator() {
  const [valArea, setValArea] = useState(1200);
  const [valLocality, setValLocality] = useState("Madhurawada");
  const [estimatedVal, setEstimatedVal] = useState(0);

  const rates = {
    Madhurawada: 5350,
    Yendada: 5800,
    Seethammadhara: 6200,
    Balaga: 2800
  };

  useEffect(() => {
    const rate = rates[valLocality] || 3000;
    setEstimatedVal(valArea * rate);
  }, [valArea, valLocality]);

  return (
    <div>
      <select value={valLocality}
        onChange={(e) => setValLocality(e.target.value)}>
        {Object.keys(rates).map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <input
        type="number"
        value={valArea}
        onChange={(e) => setValArea(Number(e.target.value))}
      />

      <h3>₹{estimatedVal.toLocaleString("en-IN")}</h3>
    </div>
  );
}