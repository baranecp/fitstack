import { db } from "@/db";

const TrainingPlans = async () => {
  const id = 1;
  const workoutPlans = await db.query.workoutPlans.findMany({
    where: (workoutPlan, { eq }) => eq(workoutPlan.userId, id),
  });

  return (
    <>
      {workoutPlans.length === 0 ? (
        <div>
          <h3>No plans found</h3>
          <button>Create New Plan</button>
        </div>
      ) : (
        <ul>
          {workoutPlans.map((workout) => (
            <li key={workout.id}>{workout.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TrainingPlans;
