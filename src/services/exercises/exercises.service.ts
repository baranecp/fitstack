import { db } from "@/db";

export const getExercises = async () => {
  return db.query.exercises.findMany({
    columns: {
      id: true,
      name: true,
    },
  });
};
