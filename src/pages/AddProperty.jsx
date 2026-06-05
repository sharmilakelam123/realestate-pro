import React from "react";
import { motion } from "framer-motion";

export default function HomeLoans() {

  const sections = [
    {
      title: "Apply Now",
      items: [
        "Home Loans",
        "Balance Transfer",
        "Loan Against Property"
      ]
    },
    {
      title: "Partners",
      items: [
        "SBI Home Loan",
        "HDFC Home Loan",
        "Axis Home Loan",
        "Kotak Home Loan",
        "LIC HF Home Loan",
        "ICICI Home Loan",
        "Canara Bank Home Loan",
        "Bank of Baroda Home Loan",
        "Punjab National Bank Home Loan"
      ]
    },
    {
      title: "Explore",
      items: [
        "Home Loan EMI Calculator",
        "Home Loan Eligibility",
        "Get Home Loan Offers",
        "Check Credit Score",
        "Home Loan Prepayment",
        "Home Loan Interest Rate",
        "Home Loan Balance Transfer",
        "Home Loan Documentation"
      ]
    },
    {
      title: "EMI Calculators",
      items: [
        "SBI Home Loan EMI Calculator",
        "HDFC Home Loan EMI Calculator",
        "Axis Bank Home Loan EMI Calculator",
        "Bajaj Home Loan EMI Calculator",
        "Kotak Home Loan EMI Calculator",
        "L&T Home Loan EMI Calculator"
      ]
    },
    {
      title: "Interest Rates",
      items: [
        "SBI Home Loan Interest Rate",
        "HDFC Home Loan Interest Rate",
        "Axis Bank Home Loan Interest Rate",
        "Bajaj Home Loan Interest Rate",
        "Kotak Bank Interest Rate",
        "L&T Home Loan Interest Rate"
      ]
    }
  ];

  return (
    <div style={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>

      <h1 style={{ marginBottom: "20px" }}>🏠 Home Loans</h1>

      {sections.map((sec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 + i * 0.1 }}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "#0054a6" }}>
            {sec.title}
          </h2>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            {sec.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 12px",
                  background: "#eef3ff",
                  borderRadius: "8px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

    </div>
  );
}