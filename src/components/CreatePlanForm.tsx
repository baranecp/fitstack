"use client";
import { useActionState } from "react";
import { Button } from "./ui/button/button";
import { createTrainingPlan } from "@/app/training-plans/actions";

type CreatePlanFormProps = {
  ref?: React.RefObject<HTMLDialogElement | null>;
};

export const CreatePlanForm = ({ ref }: CreatePlanFormProps) => {
  const [state, formAction, isPending] = useActionState(createTrainingPlan, {});
  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <legend className='sr-only'>Create training plan</legend>
      <div>
        <label className='block mb-2' htmlFor='name'>
          Plan Name
        </label>
        <input
          className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white  dark:border-gray-700 text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors'
          type='text'
          name='name'
          id='name'
          placeholder='e.g., Upper Body Strength'
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p className='text-red-300'>{state.errors.name}</p>
        )}
      </div>
      <div>
        <label className='block mb-2' htmlFor='description'>
          Description
        </label>
        <textarea
          rows={3}
          className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white  dark:border-gray-700 text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors resize-none'
          name='description'
          id='description'
          placeholder="Whats's the focus of this plan?"
          aria-invalid={!!state.errors?.description}
          aria-describedby={
            state.errors?.description ? "description-error" : undefined
          }
        />
        {state.errors?.description && (
          <p className='text-red-300'>{state.errors.description}</p>
        )}
      </div>
      <div className='flex gap-4'>
        <Button
          type='submit'
          isLoading={isPending}
          disabled={isPending}
          className='flex-1 rounded-xl'>
          {isPending ? "Loading..." : "Create Plan"}
        </Button>
        <Button
          variant='secondary'
          onClick={() => ref?.current?.close()}
          disabled={isPending}
          type='button'
          className='rounded-xl'>
          Cancel
        </Button>
      </div>
    </form>
  );
};
