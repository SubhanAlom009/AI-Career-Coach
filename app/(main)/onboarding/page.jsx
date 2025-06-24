import { industries } from '@/data/industries'
import React from 'react'
import OnBoardingForm from './_components/OnboardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

async function OnboardingPage() {

  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    // Redirect to dashboard or another page if the user is already onboarded
    redirect("/dashboard");
  }

  return (
    <div>
      <OnBoardingForm industries={industries} />
    </div>
  )
}

export default OnboardingPage
