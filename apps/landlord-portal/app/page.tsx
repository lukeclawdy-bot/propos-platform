import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to onboarding flow
  redirect("/onboarding");
}