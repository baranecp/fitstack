import { getWorkoutPlan } from "@/services/workout-plans";
import { notFound } from "next/navigation";

const TrainingPlan = async ({ params }: { params: { id: string } }) => {
  const current_user_id = 1;
  const { id } = await params;
  const plan = await getWorkoutPlan(parseInt(id), current_user_id);

  if (!plan) notFound();

  return (
    <div>
      <h1>{plan.name}</h1>
      <p>{plan.description}</p>

      {plan.exercises.map((planItem) => (
        <div
          key={planItem.exerciseId}
          className='border border-[#ccc] p-4 mb-4'>
          <h3>{planItem.exercise.name}</h3>
          <p>
            Target: {planItem.sets} sets x {planItem.reps}
          </p>
          {planItem.notes && (
            <p>
              <em>Note: {planItem.notes} </em>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrainingPlan;
