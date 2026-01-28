import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// =========================================
//  SECTION 1: CORE ENTITIES
// =========================================

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  muscleGroup: text("muscle_group").notNull(), // e.g., "Push", "Legs"
});

// =========================================
//  SECTION 2: WORKOUT HISTORY (LOGGING)
// =========================================

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  status: text("status").default("completed"),
});

export const sets = pgTable("sets", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id")
    .references(() => workouts.id)
    .notNull(),
  exerciseId: integer("exercise_id")
    .references(() => exercises.id)
    .notNull(),
  reps: integer("reps").notNull(), // Exact reps performed
  weight: real("weight").notNull(),
  order: integer("order").notNull(),
});

// =========================================
//  SECTION 3: WORKOUT PLANNER (TEMPLATES)
//  New additions start here!
// =========================================

export const workoutPlans = pgTable("workout_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(), // e.g. "Heavy Chest Day"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workoutPlanExercises = pgTable("workout_plan_exercises", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id")
    .notNull()
    .references(() => workoutPlans.id),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),

  order: integer("order").notNull().default(0),
  sets: integer("sets").notNull().default(3), // Target sets
  reps: text("reps").notNull().default("8-12"), // Target range (Text allows ranges)
  weight: text("weight").notNull().default(""),
  notes: text("notes"),
});

// =========================================
//  SECTION 4: RELATIONS
// =========================================

// Users Relations (Updated)
export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts), // History
  plans: many(workoutPlans), // Templates
}));

// History Relations (Existing)
export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, { fields: [workouts.userId], references: [users.id] }),
  sets: many(sets),
}));

export const setsRelations = relations(sets, ({ one }) => ({
  workout: one(workouts, {
    fields: [sets.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [sets.exerciseId],
    references: [exercises.id],
  }),
}));

// Planner Relations (New)
export const workoutPlansRelations = relations(
  workoutPlans,
  ({ one, many }) => ({
    user: one(users, { fields: [workoutPlans.userId], references: [users.id] }),
    exercises: many(workoutPlanExercises),
  }),
);

export const workoutPlanExercisesRelations = relations(
  workoutPlanExercises,
  ({ one }) => ({
    plan: one(workoutPlans, {
      fields: [workoutPlanExercises.planId],
      references: [workoutPlans.id],
    }),
    exercise: one(exercises, {
      // Links to the shared catalog
      fields: [workoutPlanExercises.exerciseId],
      references: [exercises.id],
    }),
  }),
);
