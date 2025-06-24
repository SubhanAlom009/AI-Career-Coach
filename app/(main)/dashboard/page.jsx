import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_components/DashboardView";

async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights()

  if (!isOnboarded) {
    // Redirect to dashboard or another page if the user is already onboarded
    redirect("/onboarding");
  }
  return (
    <div>
      <DashboardView insights={insights} />
    </div>
  )
}

export default DashboardPage;
