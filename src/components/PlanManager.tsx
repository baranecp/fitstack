"use client";
import { useState } from "react";
import { AddExerciseForm } from "./AddExerciseForm";
import { Button } from "./ui/button/button";
import { ExerciseCard } from "./ExerciseCard";

export type PlanExercises = {
  planId: number;
  id: number;
  sets: number;
  exerciseId: number;
  reps: string;
  weight: string;
  order: number;
  notes: string | null;
  exercise: {
    name: string;
    id: number;
    muscleGroup: string;
  };
};

type Plan = {
  id: number;
  name: string;
  description: string | null;
  exercises: PlanExercises[];
  createdAt?: Date | null;
};

type EditorState = {
  editingId: number | null;
  isCreating: boolean;
};

export const PlanManager = ({ plan }: { plan: Plan }) => {
  const [state, setState] = useState<EditorState>({
    editingId: null,
    isCreating: false,
  });

  if (!plan) return <div>Loading plan...</div>;
  const exercises = plan.exercises || [];

  const handleEditComplete = () => {
    setState({ editingId: null, isCreating: false });
  };

  return (
    <div className='flex flex-col gap-4'>
      {exercises.map((ex) => {
        // If this specific card is being edited, show Form, else show Card
        if (state.editingId === ex.id) {
          return (
            <AddExerciseForm
              key={ex.id}
              planId={plan.id}
              initialData={ex}
              onComplete={handleEditComplete}
            />
          );
        }

        return (
          <ExerciseCard
            key={ex.id}
            exerciseName={ex.exercise.name}
            sets={ex.sets}
            reps={ex.reps}
            weight={ex.weight}
            notes={ex.notes}
            // When clicking edit, we only set the ID, we don't hide the list
            onEdit={() => setState({ editingId: ex.id, isCreating: false })}
          />
        );
      })}

      {state.isCreating ? (
        <AddExerciseForm planId={plan.id} onComplete={handleEditComplete} />
      ) : (
        !state.editingId && (
          <Button
            variant='dashed'
            className='p-6 rounded-2xl border-2 border-dashed w-full'
            onClick={() => setState({ editingId: null, isCreating: true })}>
            + Add Exercise
          </Button>
        )
      )}
    </div>
  );
};
