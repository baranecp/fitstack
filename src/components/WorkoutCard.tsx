"use client";

import { Trash2, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type WorkoutExercise = {
  id: number;
  order: number;
  sets: number;
  exerciseId: number;
  reps: string;
  planId: number;
  notes: string | null;
};

type Workout = {
  id: number;
  name: string;
  description: string | null;
  exercises: WorkoutExercise[];
  createdAt?: Date | null;
};

export const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <li
      key={workout.id}
      className='group relative flex flex-col gap-4 p-6 border rounded-xl border-border-card hover:border-border-card-hover hover:shadow-md transition-all'>
      <div className='flex justify-center items-center p-2 w-12 h-12 rounded-xl bg-bg-icon-workout '>
        <Dumbbell size={24} className='text-icon-workout' />
      </div>
      <div>
        <h3 className='text-lg font-bold text-card-text mb-2'>
          <Link
            href={`/training-plans/${workout.id}`}
            className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            {workout.name}
          </Link>
        </h3>
        <p className='text-card-text/90'>{workout.description}</p>
      </div>
      <dl className='flex justify-between mt-4 text-sm text-gray-400'>
        <div>
          <dt className='sr-only'>Number of exercises</dt>
          <dd>
            {workout.exercises.length === 0
              ? "No exercises yet"
              : `${workout.exercises.length} exercises`}
          </dd>
        </div>
        <div>
          <dt className='sr-only'>Created at</dt>
          <dd>
            {workout.createdAt?.toLocaleDateString(undefined, {
              dateStyle: "medium",
            })}
          </dd>
        </div>
      </dl>
      <Button
        variant='destructive'
        className='absolute top-6 right-4 z-10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity'
        aria-label={`Remove workout ${workout.name}`}>
        <Trash2 size={20} />
      </Button>
    </li>
  );
};

export default WorkoutCard;
