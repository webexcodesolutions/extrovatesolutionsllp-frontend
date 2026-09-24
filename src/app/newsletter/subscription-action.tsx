"use client";
import { useState, useRef } from "react";
export default function NewsletterAction({ token, action }: { token: string; action: "confirm" | "unsubscribe" }) {
  const [state, setState] = useState({ busy: false, done: false, message: "" }); const busy = useRef(false);
  const submit = async () => {
    if (busy.current) return; busy.current = true; setState({ busy: true, done: false, message: "" });
    try { const response = await fetch("/api/subscriptions/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, action }), signal: AbortSignal.timeout(15000) }); const data = await response.json(); setState({ busy: false, done: response.ok, message: data.message || data.error }); }
    catch { setState({ busy: false, done: false, message: "Unable to connect. Please try again." }); }
    finally { busy.current = false; }
  };
  return <section className="mx-auto max-w-3xl px-6 py-16"><h1 className="text-3xl font-semibold">{action === "confirm" ? "Confirm your subscription" : "Unsubscribe from updates"}</h1><p className="mt-4">Select the button below to {action === "confirm" ? "start receiving property updates" : "stop receiving property updates"}.</p>{!state.done && <button disabled={state.busy} onClick={submit} className="mt-6 min-h-11 rounded-md bg-primary px-6 text-primary-foreground">{state.busy ? "Saving…" : action === "confirm" ? "Confirm subscription" : "Unsubscribe"}</button>}{state.message && <p role="status" className="mt-5">{state.message}</p>}</section>;
}
