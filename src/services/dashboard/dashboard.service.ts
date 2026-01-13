import { db } from "@/db";

export const getUserWorkout = async () => {
  return db.query.users.findFirst({
    with: {
      workouts: {
        orderBy: (workouts, { desc }) => [desc(workouts.date)],
        with: {
          sets: true,
        },
      },
    },
  });
};
