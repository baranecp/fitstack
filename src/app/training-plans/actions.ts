"use server";

import { createWorkoutPlanWithExercises } from "@/services/workout-plans";
import { revalidatePath } from "next/cache";

export const createTrainingPlan = async (formData: FormData) => {
  const workoutName = formData.get("name") as string;
  const workoutDescription = formData.get("description") as string;
  const userId = 1;
  const exercises = [];
  let index = 0;

  while (formData.has(`exercises[${index}][id]`)) {
    exercises.push({
      id: Number(formData.get(`exercises[${index}][id]`)),
      sets: Number(formData.get(`exercises[${index}][sets]`)),
      reps: formData.get(`exercises[${index}][reps]`) as string,
      notes: formData.get(`exercises[${index}][notes]`) as string,
    });
    index++;
  }

  await createWorkoutPlanWithExercises(
    userId,
    workoutName,
    workoutDescription,
    exercises
  );
  revalidatePath("/training-plans");
};
