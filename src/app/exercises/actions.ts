"use server";

import { db } from "@/db";
import { exercises, workoutPlanExercises } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const searchExercise = async ({
  exerciseName,
}: {
  exerciseName: string;
}) => {
  return db.query.exercises.findMany({
    where: ilike(exercises.name, `%${exerciseName}%`),
  });
};

export const createExercise = async ({
  planId,
  name,
  exerciseId,
  sets,
  reps,
  weight,
  notes,
}: {
  planId: number;
  name: string;
  exerciseId: number | null;
  sets: number;
  reps: string;
  weight: string;
  notes: string;
}) => {
  let finalExerciseId = exerciseId;

  if (!finalExerciseId) {
    const [newExercise] = await db
      .insert(exercises)
      .values({
        name,
        muscleGroup: "",
      })
      .returning({ id: exercises.id });
    finalExerciseId = newExercise.id;
  }

  await db.insert(workoutPlanExercises).values({
    planId,
    exerciseId: finalExerciseId,
    sets,
    reps,
    weight,
    notes,
  });
  revalidatePath(`/training-plans/${planId}`);
};
