"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("Loading...");
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const [clicked, setClicked] = useState(false); // ✅ FIX

  const fetchData = async () => {
    console.log("Clicked ✅");
    setLoading(true); // ✅ loading start

    try {
      const res = await fetch("http://localhost:5001/api/data");
      const data = await res.json();

      setMsg(data.message);
      setTime(data.time);
      setStatus("🟢 Connected"); // ✅ clean text
    } catch {
      setMsg("Backend not reachable");
      setStatus("🔴 Not Connected");
    }

    setLoading(false); // ✅ loading stop
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          color: "white",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          🚀 DevOps App1
        </h1>

        {/* ✅ Separate clean UI */}
        <p>⏱ Time: {time}</p>

        <p>
          Backend Status: <b>{status}</b>
        </p>

        <h3 style={{ marginBottom: "20px" }}>{msg}</h3>

        <button
          onClick={() => {
            fetchData();
            setClicked(true);
          }}
          style={{
            padding: "12px 25px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(45deg, #00c6ff, #0072ff)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          {loading ? "Loading..." : "🔄 Refresh"}
        </button>

        {clicked && (
          <p style={{ marginTop: "15px", color: "#00ffcc" }}>
            ✅ Button Working!
          </p>
        )}
      </div>
    </div>
  );
}
