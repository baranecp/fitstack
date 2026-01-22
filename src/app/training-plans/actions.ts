"use server";

import { createWorkoutPlan } from "@/services/workout-plans";
import { redirect } from "next/navigation";

export type TrainingPlanState = {
  errors?: {
    name?: string;
    description?: string;
  };
  message?: string;
};

export const createTrainingPlan = async (
  prevState: TrainingPlanState,
  formData: FormData,
) => {
  const workoutName = formData.get("name") as string;
  const workoutDescription = formData.get("description") as string;
  const userId = 1;

  const state: TrainingPlanState = {
    errors: {},
  };

  if (workoutName.trim() === "" && state.errors)
    state.errors.name = "The name cannot be empty!";

  if (workoutDescription.trim() === "" && state.errors)
    state.errors.description = "The description cannot be empty!";

  if (state.errors && Object.keys(state.errors).length > 0) {
    return state;
  }

  const plan = await createWorkoutPlan(userId, workoutName, workoutDescription);
  redirect(`/training-plans/${plan.id}`);
};
