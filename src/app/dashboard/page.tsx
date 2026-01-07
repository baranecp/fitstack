import { db } from "@/db/index";

const Dashboard = async () => {
  // TODO: Add Auth Check
  const user = await db.query.users.findFirst({
    with: {
      workouts: {
        orderBy: (workouts, { desc }) => [desc(workouts.date)],
        with: {
          sets: true,
        },
      },
    },
  });

  const lastWorkout = user?.workouts[0];
  const volume = lastWorkout?.sets.reduce(
    (total, set) => total + set.weight * set.reps,
    0
  );

  if (!user) {
    return (
      <div className='max-w-7xl mx-auto p-4'>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Welcome back, {user.name}!</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        {lastWorkout && (
          <div>
            <p>{lastWorkout.name}</p>
            <p>{lastWorkout.date.toLocaleDateString()}</p>
            <p>Volume: {volume}kg</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
