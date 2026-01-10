import { db } from "@/db";
import { notFound } from "next/navigation";

const TrainingPlan = async ({ params }: { params: { id: string } }) => {
  const current_user_id = 1;
  const { id } = await params;
  const plan = await db.query.workoutPlans.findFirst({
    where: (workoutPlan, { and, eq }) =>
      and(
        eq(workoutPlan.userId, current_user_id),
        eq(workoutPlan.id, parseInt(id))
      ),
  });

  if (!plan) notFound();

  return (
    <div>
      <h1>{plan.name}</h1>
      <p>{plan.description}</p>
    </div>
  );
};

export default TrainingPlan;
