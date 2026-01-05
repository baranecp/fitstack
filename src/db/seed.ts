import { config } from "dotenv";
config({ path: ".env.local" });
import { users, exercises, sets, workouts } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🌱 Starting Master Seed...");
  const { db } = await import("./index");
  // 1. Create Exercise Catalog
  console.log("...Inserting Exercises");
  const exerciseData = [
    { name: "Back Squat", muscleGroup: "Legs" },
    { name: "Bench Press", muscleGroup: "Push" },
    { name: "Deadlift", muscleGroup: "Pull" },
    { name: "Overhead Press", muscleGroup: "Push" },
    { name: "Pull Up", muscleGroup: "Pull" },
  ];

  // We use .onConflictDoNothing() in case you run this twice!
  // Note: This requires a unique constraint on 'name' in schema,
  // but for now, we will just insert.
  const insertedExercises = await db
    .insert(exercises)
    .values(exerciseData)
    .returning();

  // 2. Find our User
  const user = await db.query.users.findFirst({
    where: eq(users.email, "baranec.dev@gmail.com"),
  });

  if (!user) {
    throw new Error("❌ User not found! Did you run the previous seed?");
  }

  // 3. Create a Workout (from yesterday)
  console.log("...Logging a Workout");
  const [workout] = await db
    .insert(workouts)
    .values({
      userId: user.id,
      name: "Heavy Push Day",
      date: new Date(Date.now() - 86400000), // Yesterday
      status: "completed",
    })
    .returning();

  // 4. Add Sets (Bench Press)
  // We find the ID for "Bench Press" from our inserted list
  const benchPress = insertedExercises.find((e) => e.name === "Bench Press");

  if (benchPress) {
    await db.insert(sets).values([
      {
        workoutId: workout.id,
        exerciseId: benchPress.id,
        reps: 8,
        weight: 60, // Warmup
        order: 1,
      },
      {
        workoutId: workout.id,
        exerciseId: benchPress.id,
        reps: 5,
        weight: 80, // Working Set
        order: 2,
      },
      {
        workoutId: workout.id,
        exerciseId: benchPress.id,
        reps: 5,
        weight: 80, // Working Set
        order: 3,
      },
    ]);
  }

  console.log("✅ Master Seed Complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
