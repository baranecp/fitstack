"use server";

import { db } from "@/db";
import { exercises, workoutPlanExercises } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const searchExercise = async ({
  exerciseName,
}: {
  exerciseName: string;
}) => {
  if (!exerciseName || exerciseName.length < 2) return [];
  return db.query.exercises.findMany({
    where: ilike(exercises.name, `%${exerciseName}%`),
    limit: 5,
  });
};

async function resolveExerciseId(name: string, exerciseId: number | null) {
  if (exerciseId) return exerciseId;

  // If no ID is provided, create a new custom exercise
  const [newExercise] = await db
    .insert(exercises)
    .values({ name, muscleGroup: "" })
    .returning({ id: exercises.id });

  return newExercise.id;
}

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
  const finalExerciseId = await resolveExerciseId(name, exerciseId);

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

export const editExercise = async ({
  planId,
  id,
  name,
  exerciseId,
  sets,
  reps,
  weight,
  notes,
}: {
  planId: number;
  id: number;
  name: string;
  exerciseId: number | null;
  sets: number;
  reps: string;
  weight: string;
  notes: string;
}) => {
  const finalExerciseId = await resolveExerciseId(name, exerciseId);
  await db
    .update(workoutPlanExercises)
    .set({ exerciseId: finalExerciseId, sets, reps, weight, notes })
    .where(eq(workoutPlanExercises.id, id));

  revalidatePath(`/training-plans/${planId}`);
};
