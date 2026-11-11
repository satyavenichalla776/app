
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Allow the frontend to communicate with the backend
app.use(cors());

// Allow the server to read JSON data
app.use(express.json());

// Decide which team should receive the ticket
function routeTicket(ticket, orderId) {
  const message = ticket.toLowerCase();
  const hasOrderId = Boolean(
    typeof orderId === "string" && orderId.trim()
  );

  let category;
  let team;
  let explanation;

  // Billing tickets
  if (/\b(payment|charged|charge|billing|invoice|refund)\b/.test(message)) {
    category = "Billing";

    if (!hasOrderId) {
      team = "Manual Review";
      explanation =
        "Billing ticket held for manual review because the Order ID is missing.";
    } else {
      team = "Billing";
      explanation =
        "The customer reports a payment or billing-related issue.";
    }

  // Account access tickets
  } else if (/\b(login|log in|password|account|sign in|signin)\b/.test(message)) {
    category = "Account Access";
    team = "Account Support";
    explanation =
      "The customer reports a login or account-access problem.";

  // Delivery tickets
  } else if (/\b(package|delivery|delivered|shipment|shipping|arrived)\b/.test(message)) {
    category = "Delivery";

    if (!hasOrderId) {
      team = "Manual Review";
      explanation =
        "Delivery ticket held for manual review because the Order ID is missing.";
    } else {
      team = "Fulfillment";
      explanation =
        "The customer reports a delivery or shipment problem.";
    }

  // Unknown tickets
  } else {
    category = "Unknown";
    team = "Manual Review";
    explanation =
      "There is not enough information to identify the issue.";
  }

  return {
    category,
    team,
    explanation,
    orderId: hasOrderId ? orderId.trim() : null
  };
}

// Receive a ticket from the frontend
app.post("/api/route-ticket", (req, res) => {
  const { ticket, orderId } = req.body;

  if (!ticket || typeof ticket !== "string" || !ticket.trim()) {
    return res.status(400).json({
      error: "Ticket description is required."
    });
  }

  const result = routeTicket(ticket.trim(), orderId);
  res.json(result);
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Support Triage API running at http://localhost:${PORT}`);
});
