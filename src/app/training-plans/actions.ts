"use server";

import { db } from "@/db";
import { workoutPlans } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createTrainingPlan(formData: FormData) {
  await db.insert(workoutPlans).values({
    name: "New Routine",
    userId: 1,
    description: "New Routine description",
  });

  revalidatePath("/training-plans");
}
