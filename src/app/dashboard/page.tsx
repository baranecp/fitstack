import { users } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";

const Dashboard = async () => {
  // TODO: Add Auth Check
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, "baranec.dev@gmail.com"))
    .then((res) => res[0]);

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
      <div className='grid grid-cols-1 lg:grid-cols-3'></div>
    </div>
  );
};

export default Dashboard;
