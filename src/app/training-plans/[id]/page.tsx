import { db } from "@/db";

const TrainingPlan = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  const plan = await db.query.workoutPlans.findFirst({
    where: (workoutPlan, { eq }) => eq(workoutPlan.userId, id),
  });

  return (
    <div>
      <h1>{plan?.name}</h1>
      <p>{plan?.description}</p>
    </div>
  );
};

export default TrainingPlan;
