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
      const response = await fetch(
        "http://localhost:5000/api/route-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: ticket,
            orderId: orderId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      setError(
        "Could not connect to the backend. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">S</div>

          <div>
            <h1>Support Triage Desk</h1>
            <p>Customer Support Ticket Routing System</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          System Online
        </div>
      </header>

      <main className="main-container">
        <section className="intro">
          <span className="badge">SUPPORT ROUTING</span>

          <h2>Route a Customer Ticket</h2>

          <p>
            Enter the customer's issue below and our routing system
            will identify the appropriate support team.
          </p>
        </section>

        <section className="ticket-card">
          <div className="card-header">
            <div>
              <h3>Ticket Information</h3>
              <p>Provide the customer's support request.</p>
            </div>

            <span className="required">* Required</span>
          </div>

          <div className="form-group">
            <label htmlFor="ticket">
              Ticket Description <span>*</span>
            </label>

            <textarea
              id="ticket"
              placeholder="Example: I was charged twice for my order..."
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="orderId">Order ID</label>

            <input
              id="orderId"
              type="text"
              placeholder="Example: A101"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />

            <small>
              Optional for account-access issues. Billing and delivery
              tickets may require an Order ID.
            </small>
          </div>

          <button
            className="route-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Routing Ticket..." : "Route Ticket"}
            {!loading && <span>→</span>}
          </button>

          {error && <div className="error-message">{error}</div>}
        </section>

        {result && (
          <section className="result-card">
            <div className="result-header">
              <div>
                <span className="result-badge">ROUTING RESULT</span>
                <h3>Ticket Successfully Routed</h3>
              </div>

              <div className="check-icon">✓</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">CATEGORY</span>
                <strong>{result.category}</strong>
              </div>

              <div className="result-item">
                <span className="result-label">ASSIGNED TEAM</span>
                <strong>{result.team}</strong>
              </div>
            </div>

            <div className="explanation">
              <span className="result-label">EXPLANATION</span>

              <p>{result.explanation}</p>
            </div>

            {result.orderId && (
              <div className="order-result">
                <span className="result-label">ORDER ID</span>
                <strong>{result.orderId}</strong>
              </div>
            )}
          </section>
        )}

        <section className="routing-info">
          <h3>How routing works</h3>

          <div className="routing-grid">
            <div>
              <span className="routing-icon billing">B</span>
              <div>
                <strong>Billing</strong>
                <p>Payment and billing issues</p>
              </div>
            </div>

            <div>
              <span className="routing-icon account">A</span>
              <div>
                <strong>Account Support</strong>
                <p>Login and account access</p>
              </div>
            </div>

            <div>
              <span className="routing-icon delivery">D</span>
              <div>
                <strong>Fulfillment</strong>
                <p>Delivery and shipment issues</p>
              </div>
            </div>

            <div>
              <span className="routing-icon review">M</span>
              <div>
                <strong>Manual Review</strong>
                <p>Unclear or held tickets</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Support Triage Desk • Customer Support Routing</p>
      </footer>
    </div>
  );
}

export default App;