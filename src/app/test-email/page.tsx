// app/page.tsx  (or any other server/client component)
"use client";

import { useState } from "react";
import EmailTrigger from "@/components/request-email-trigger";

export default function DemoPage() {
  const [recipient, setRecipient] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fire, setFire] = useState(false);

  return (
    <main style={{ padding: 40 }}>
      <h1>Fire an email</h1>

      <input
        placeholder="recipient@example.com"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        placeholder="enter your first name"
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
      />
      <input
        placeholder="lastname"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
      />

      <button onClick={() => setFire(true)} disabled={!recipient || fire}>
        {fire ? "Sending…" : "Send"}
      </button>

      {fire && (
        <EmailTrigger
          to={recipient}
          send={fire}
          firstName={firstName}
          lastName={lastName}
          onSent={(res) => alert("Sent! " + res.status)}
          onError={(err) => alert("Error: " + err.text)}
        />
      )}
    </main>
  );
}
