import { PlanManager } from "@/components/PlanManager";
import { getWorkoutPlan } from "@/services/workout-plans";
import { notFound } from "next/navigation";

type TrainingPlanProps = { params: Promise<{ id: string }> };

const TrainingPlan = async ({ params }: TrainingPlanProps) => {
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
        <PlanManager plan={plan} />
      </div>
    </div>
  );
};

export default TrainingPlan;
