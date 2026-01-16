"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  description: string | null;
  exercises: [];
  createdAt?: Date | null;
};

export const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <li
      key={workout.id}
      className='group relative p-6 border rounded-xl hover:shadow-md transition-all'>
      <h3 className='text-lg font-bold'>
        <Link
          href={`/training-plans/${workout.id}`}
          className='focus:outline-none'>
          <span className='absolute inset-0' aria-hidden='true' />
          {workout.name}
        </Link>
      </h3>
      <p>{workout.description}</p>
      <div className='flex justify-between mt-4 text-sm text-gray-400'>
        <p>
          {workout.exercises.length === 0
            ? "No exercises yet"
            : `${workout.exercises.length} exercises`}
        </p>
        <p>{workout.createdAt?.toDateString()}</p>
      </div>
      <button
        className='absolute top-4 right-4 z-10 p-2  text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50'
        aria-label='Remove workout'>
        <Trash2 />
      </button>
    </li>
  );
};

export default WorkoutCard;
