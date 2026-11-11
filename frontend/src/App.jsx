
import { useState } from "react";
import "./App.css";

function App() {
  const [ticket, setTicket] = useState("");
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!ticket.trim()) {
      setError("Please enter a ticket description.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/route-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ticket: ticket,
          orderId: orderId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      setError("Could not connect to the backend. Please check the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Support Triage Desk</h1>
        <p>Customer Support Ticket Routing System</p>
      </header>

      <main>
        <h2>Submit a Support Ticket</h2>

        <label>Ticket Description *</label>
        <textarea
          placeholder="Describe the customer's problem..."
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />

        <label>Order ID (Optional)</label>
        <input
          type="text"
          placeholder="Example: A101"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Routing..." : "Route Ticket"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && (
          <div className="result">
            <h2>Ticket Routing Result</h2>
            <p><strong>Category:</strong> {result.category}</p>
            <p><strong>Assigned Team:</strong> {result.team}</p>
            <p><strong>Explanation:</strong> {result.explanation}</p>
            {result.orderId && (
              <p><strong>Order ID:</strong> {result.orderId}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
