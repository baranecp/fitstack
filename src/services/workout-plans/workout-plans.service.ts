import { db } from "@/db";
import { workoutPlanExercises, workoutPlans } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getWorkoutPlans = async (userId: number) => {
  return db.query.workoutPlans.findMany({
    where: eq(workoutPlans.userId, userId),
    with: {
      exercises: true,
    },
  });
};

export const getWorkoutPlan = async (planId: number, userId: number) => {
  return db.query.workoutPlans.findFirst({
    where: and(eq(workoutPlans.id, planId), eq(workoutPlans.userId, userId)),
    with: {
      exercises: {
        with: {
          exercise: true,
        },
      },
    },
  });
};

export const createWorkoutPlanWithExercises = async (
  userId: number,
  name: string,
  description: string,
  exercises: { id: number; sets: number; reps: string; notes: string }[]
) => {
  return await db.transaction(async (tx) => {
    const [plan] = await tx
      .insert(workoutPlans)
      .values({
        userId,
        name,
        description,
      })
      .returning({ id: workoutPlans.id });

    const mappedExercises = exercises.map((exercise) => ({
      planId: plan.id,
      exerciseId: exercise.id,
      sets: exercise.sets,
      reps: exercise.reps.toString(),
      notes: exercise.notes,
    }));

    if (mappedExercises.length > 0) {
      await tx.insert(workoutPlanExercises).values(mappedExercises);
    }

    return plan;
  });
};
