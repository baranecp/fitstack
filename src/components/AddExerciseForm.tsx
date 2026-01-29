"use client";
import { Controller, useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import { Button } from "./ui/button/button";
import { createExercise, editExercise } from "@/app/exercises/actions";
import { PlanExercises } from "./PlanManager";
import { ExerciseSearchInput } from "./ExerciseSearchInput";

type FormValues = {
  exerciseName: string;
  exerciseId: number | null;
  sets: number;
  reps: string;
  weight: string;
  notes: string;
};

export const AddExerciseForm = ({
  planId,
  initialData,
  onComplete,
}: {
  planId: number;
  initialData?: PlanExercises;
  onComplete: () => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      exerciseId: initialData?.exerciseId ?? null,
      exerciseName: initialData?.exercise.name ?? "",
      sets: initialData?.sets ?? 3,
      reps: initialData?.reps ?? "",
      weight: initialData?.weight ?? "",
      notes: initialData?.notes ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (initialData) {
        await editExercise({
          planId,
          id: initialData.id,
          name: data.exerciseName,
          exerciseId: data.exerciseId,
          sets: data.sets,
          reps: data.reps,
          weight: data.weight || "",
          notes: data.notes || "",
        });
      } else {
        await createExercise({
          planId,
          name: data.exerciseName,
          exerciseId: data.exerciseId,
          sets: data.sets,
          reps: data.reps,
          weight: data.weight || "",
          notes: data.notes || "",
        });
      }
      onComplete();
    } catch (error) {
      console.error("Failed to save exercise", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex relative flex-col gap-4 border border-border-card hover:border-border-card-hover p-4 mb-4 rounded-2xl bg-card animate-in fade-in zoom-in-95 duration-200'>
      <fieldset className='flex flex-col gap-2'>
        <legend className='sr-only'>Exercise details</legend>

        <Controller
          name='exerciseName'
          control={control}
          rules={{ required: "Exercise name is required" }}
          render={({ field }) => (
            <ExerciseSearchInput
              value={field.value}
              onChange={field.onChange}
              onSelect={(id, name) => {
                setValue("exerciseId", id);
                setValue("exerciseName", name, { shouldValidate: true });
              }}
            />
          )}
        />
        {errors.exerciseName && (
          <span className='text-xs text-red-500'>
            {errors.exerciseName.message}
          </span>
        )}
      </fieldset>

      <fieldset className='grid grid-cols-3 gap-4'>
        <legend className='sr-only'>Training parameters</legend>
        <div>
          <label htmlFor='sets' className='block mb-2 text-sm font-medium'>
            Sets
          </label>
          <input
            {...register("sets")}
            id='sets'
            type='number'
            className='w-full border border-border-card rounded-lg p-2 bg-background'
          />
          {errors.sets && (
            <span className='text-xs text-red-500'>{errors.sets.message}</span>
          )}
        </div>

        <div>
          <label htmlFor='reps' className='block mb-2 text-sm font-medium'>
            Reps
          </label>
          <input
            {...register("reps")}
            id='reps'
            className='w-full border border-border-card rounded-lg p-2 bg-background'
          />
          {errors.reps && (
            <span className='text-xs text-red-500'>{errors.reps.message}</span>
          )}
        </div>

        <div>
          <label htmlFor='weight' className='block mb-2 text-sm font-medium'>
            Weight
          </label>
          <input
            {...register("weight")}
            id='weight'
            placeholder='e.g. 45lbs'
            className='w-full border border-border-card rounded-lg p-2 bg-background'
          />
        </div>
      </fieldset>

      <fieldset className='flex flex-col'>
        <legend className='sr-only'>Notes</legend>
        <label htmlFor='notes' className='block mb-2 text-sm font-medium'>
          Notes
        </label>
        <textarea
          {...register("notes")}
          id='notes'
          rows={2}
          className='resize-none w-full border border-border-card rounded-lg p-2 bg-background'
          placeholder='Add any notes...'
        />
      </fieldset>

      <div className='flex justify-end gap-2 pt-2'>
        <Button
          type='button'
          variant='ghost'
          onClick={onComplete}
          disabled={isSubmitting}
          className='rounded-xl px-4 py-2 text-sm'>
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='rounded-xl px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2'>
          {isSubmitting ? (
            <Loader2 size={16} className='animate-spin' />
          ) : (
            <Save size={16} />
          )}
          {initialData ? "Update" : "Add Exercise"}
        </Button>
      </div>
    </form>
  );
};
