"use client";
import { createTrainingPlan } from "@/app/training-plans/actions";
import { useActionState, useRef } from "react";

export const CreatePlanModal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [state, formAction, isPending] = useActionState(createTrainingPlan, {});
  return (
    <>
      <button
        className='bg-primary text-white px-5 py-4 rounded-2xl'
        onClick={() => dialogRef.current?.showModal()}>
        + New Plan
      </button>
      <dialog
        onClick={(e) =>
          e.target === e.currentTarget && dialogRef.current?.close()
        }
        onClose={(e) => e.currentTarget.querySelector("form")?.reset()}
        ref={dialogRef}
        className='backdrop:bg-black/75'>
        <h3>Create Training Plan</h3>
        <form action={formAction}>
          <div>
            <label htmlFor='name'>Plan Name</label>
            <input
              type='text'
              name='name'
              placeholder='e.g., Upper Body Strength'
            />
            {state.errors?.name && <p>{state.errors.name}</p>}
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              name='description'
              placeholder="Whats's the focus of this plan?"
            />
            {state.errors?.description && <p>{state.errors.description}</p>}
          </div>
          <button type='submit' disabled={isPending}>
            {isPending ? "Loading..." : "Create Plan"}
          </button>
          <button onClick={() => dialogRef.current?.close()} type='button'>
            Cancel
          </button>
        </form>
      </dialog>
    </>
  );
};
