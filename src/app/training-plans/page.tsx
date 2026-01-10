import { db } from "@/db";
import { createTrainingPlan } from "./actions";
import Link from "next/link";

const TrainingPlans = async () => {
  const id = 1;
  const workoutPlans = await db.query.workoutPlans.findMany({
    where: (workoutPlan, { eq }) => eq(workoutPlan.userId, id),
  });

  return (
    <>
      <form action={createTrainingPlan}>
        <button type='submit'>Create New Plan</button>
      </form>
      {workoutPlans.length === 0 ? (
        <div>
          <h3>No plans found</h3>
        </div>
      ) : (
        <ul>
          {workoutPlans.map((workout) => (
            <Link key={workout.id} href={`/training-plans/${workout.id}`}>
              {workout.name}
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default TrainingPlans;
