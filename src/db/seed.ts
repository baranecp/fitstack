import { config } from "dotenv";
config({ path: ".env.local" });
import {
  users,
  exercises,
  sets,
  workouts,
  workoutPlans,
  workoutPlanExercises,
} from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🌱 Starting Master Seed...");
  const { db } = await import("./index");

  // 1. Ensure User Exists (Upsert-style check)
  console.log("...Checking User");
  let user = await db.query.users.findFirst({
    where: eq(users.email, "baranec.dev@gmail.com"),
  });

  if (!user) {
    console.log("...User not found, creating user");
    [user] = await db
      .insert(users)
      .values({
        name: "Baranec Dev",
        email: "baranec.dev@gmail.com",
      })
      .returning();
  }

  // 2. Create Exercise Catalog
  console.log("...Inserting Exercises");
  const exerciseData = [
    { name: "Back Squat", muscleGroup: "Legs" },
    { name: "Bench Press", muscleGroup: "Push" },
    { name: "Deadlift", muscleGroup: "Pull" },
    { name: "Overhead Press", muscleGroup: "Push" },
    { name: "Pull Up", muscleGroup: "Pull" },
  ];

  await db.insert(exercises).values(exerciseData).onConflictDoNothing();

  // Re-fetch exercises if they weren't inserted (due to conflict)
  const allExercises = await db.select().from(exercises);
  const benchPress = allExercises.find((e) => e.name === "Bench Press");
  const overheadPress = allExercises.find((e) => e.name === "Overhead Press");

  // 3. Create a Workout History Entry (Section 2 of Schema)
  console.log("...Logging a Past Workout");
  const [workout] = await db
    .insert(workouts)
    .values({
      userId: user.id,
      name: "Heavy Push Day",
      date: new Date(Date.now() - 86400000), // Yesterday
      status: "completed",
    })
    .returning();

  if (benchPress) {
    await db.insert(sets).values([
      {
        workoutId: workout.id,
        exerciseId: benchPress.id,
        reps: 8,
        weight: 60,
        order: 1,
      },
      {
        workoutId: workout.id,
        exerciseId: benchPress.id,
        reps: 5,
        weight: 80,
        order: 2,
      },
    ]);
  }

  // 4. Create a Workout Plan Template (Section 3 of Schema)
  console.log("...Creating Workout Plan Template");
  const [plan] = await db
    .insert(workoutPlans)
    .values({
      userId: user.id,
      name: "Strength Starter Plan",
      description: "A simple push-focused strength routine",
    })
    .returning();

  if (benchPress && overheadPress) {
    await db.insert(workoutPlanExercises).values([
      {
        planId: plan.id,
        exerciseId: benchPress.id,
        order: 1,
        sets: 3,
        reps: "5-8",
        notes: "Focus on explosive upward movement",
      },
      {
        planId: plan.id,
        exerciseId: overheadPress.id,
        order: 2,
        sets: 3,
        reps: "8-12",
        notes: "Keep core tight",
      },
    ]);
  }

  console.log("✅ Master Seed Complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
