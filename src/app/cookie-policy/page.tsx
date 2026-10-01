import type { Metadata } from "next";
import InformationPage from "@/components/shared/InformationPage";
export const metadata: Metadata = { title: "Cookie and storage policy", alternates: { canonical: "/cookie-policy" } };
export default function Cookies() { return <InformationPage title="Cookie and storage policy"><p>This website stores your light or dark theme preference in your browser’s local storage so it can be remembered between visits.</p><p>The application does not currently include advertising or analytics trackers. Hosting infrastructure may process technical request information to operate and protect the service.</p><p>You can clear site data in your browser settings to remove the saved theme preference. Doing so resets the appearance preference.</p></InformationPage>; }
