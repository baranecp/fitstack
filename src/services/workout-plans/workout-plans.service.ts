import { db } from "@/db";
import { workoutPlans } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getWorkoutPlans = async (userId: number) => {
  return db.query.workoutPlans.findMany({
    where: eq(workoutPlans.userId, userId),
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

export const createWorkoutPlan = async (
  userId: number,
  name: string,
  description: string
) => {
  const [plan] = await db
    .insert(workoutPlans)
    .values({
      userId,
      name,
      description,
    })
    .returning();

  return plan;
};
