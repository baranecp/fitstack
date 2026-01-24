import { Button } from "@/components/ui/button";
import { getWorkoutPlan } from "@/services/workout-plans";
import { notFound } from "next/navigation";

const TrainingPlan = async ({ params }: { params: { id: string } }) => {
  const current_user_id = 1;
  const { id } = await params;
  const plan = await getWorkoutPlan(parseInt(id), current_user_id);

  if (!plan) notFound();

  return (
    <div className='max-w-7xl mx-auto py-4'>
      <div className='flex flex-col max-w-4xl mx-auto px-4 gap-6'>
        <div className='bg-linear-to-r from-emerald-500 to-blue-500 p-8 rounded-2xl text-white'>
          <h1 className='text-3xl mb-2'>{plan.name}</h1>
          <p>{plan.description}</p>
        </div>
        {plan.exercises.map((planItem) => (
          <div
            key={planItem.exerciseId}
            className='border border-[#ccc] p-4 mb-4 bg-gray-300'>
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
        <Button variant='dashed' className='p-6 rounded-2xl'>
          + Add Exercise
        </Button>
      </div>
    </div>
  );
};

export default TrainingPlan;
