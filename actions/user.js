"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "@/actions/dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const result = await db.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // if not, create it with default values - will replace with AI later
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          const demandLevel = (insights.demandLevel || "").toUpperCase();
          const marketOutlook = (insights.marketOutlook || "").toUpperCase();

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              demandLevel,
              marketOutlook,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            },
          });
        }

        // update the user with the new data
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return {
          updatedUser,
          industryInsight,
        };
      },
      {
        timeout: 10000,
      }
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user" + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error fetching user onboarding status:", error);
    throw new Error("Failed to fetch user onboarding status");
  }
}
