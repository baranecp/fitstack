"use client";

import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
}

interface CreatePlanFormProps {
  exercises: Exercise[];
}

interface PlanExercise extends Exercise {
  instanceId: number;
  sets: number;
  reps: number;
  notes: string;
}

const CreatePlanForm = ({ exercises }: CreatePlanFormProps) => {
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(exercises[0].id);

  const handleAdd = () => {
    const exercise = exercises.find(({ id }) => id === selectedExerciseId);
    if (!exercise) return;
    setPlanExercises([
      ...planExercises,
      { ...exercise, instanceId: Date.now(), sets: 4, reps: 10, notes: "" },
    ]);
  };

  const handleDelete = (idToDelete: number) => {
    setPlanExercises((prevItems) =>
      prevItems.filter((item) => item.instanceId !== idToDelete)
    );
  };

  const handleUpdateSets = (instanceId: number, newSets: number) => {
    setPlanExercises((prevItems) =>
      prevItems.map((item) =>
        item.instanceId === instanceId ? { ...item, sets: newSets || 0 } : item
      )
    );
  };

  const handleUpdateReps = (instanceId: number, newReps: number) => {
    setPlanExercises((prevItems) =>
      prevItems.map((item) =>
        item.instanceId === instanceId ? { ...item, reps: newReps || 0 } : item
      )
    );
  };

  return (
    <>
      <form>
        <select
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(parseInt(e.target.value))}>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleAdd}>
          Add Exercise
        </button>
      </form>
      <ul>
        {planExercises.map((exercise) => (
          <li key={exercise.instanceId}>
            {exercise.name} -{" "}
            <input
              value={exercise.sets}
              onChange={(e) =>
                handleUpdateSets(exercise.instanceId, parseInt(e.target.value))
              }
            />
            sets x
            <input
              value={exercise.reps}
              onChange={(e) =>
                handleUpdateReps(exercise.instanceId, parseInt(e.target.value))
              }
            />
            reps
            <button
              type='button'
              onClick={() => handleDelete(exercise.instanceId)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CreatePlanForm;
