"use server";

import { createWorkoutPlan } from "@/services/workout-plans";
import { revalidatePath } from "next/cache";

export const createTrainingPlan = async (formData: FormData) => {
  const workoutName = formData.get("name") as string;
  const workoutDescription = formData.get("description") as string;
  const userId = 1;
  await createWorkoutPlan(userId, workoutName, workoutDescription);
  revalidatePath("/training-plans");
};
