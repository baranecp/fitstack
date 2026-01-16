import WorkoutCard from "@/components/WorkoutCard";
import { getWorkoutPlans } from "@/services/workout-plans";
import Link from "next/link";

const TrainingPlans = async () => {
  const id = 1;
  const workoutPlans = await getWorkoutPlans(id);

  return (
    <div className='max-w-7xl mx-auto py-4'>
      <div className='flex justify-between items-center my-6'>
        <div>
          <h1 className='text-3xl'>Training Plans</h1>
          <p className='mt-4'>Create and manage your workout routines</p>
        </div>
        <Link
          href='/training-plans/create'
          className='bg-primary text-white px-5 py-4 rounded-2xl'>
          + New Plan
        </Link>
      </div>
      {workoutPlans.length === 0 ? (
        <p>No plans found</p>
      ) : (
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {workoutPlans.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainingPlans;
