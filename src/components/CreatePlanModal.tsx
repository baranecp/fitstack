"use client";

import { useRef, useState } from "react";
import { CreatePlanForm } from "./CreatePlanForm";

export const CreatePlanModal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className='bg-primary text-white px-5 py-4 rounded-2xl'
        onClick={() => {
          dialogRef.current?.showModal();
          setIsOpen(!isOpen);
        }}>
        + New Plan
      </button>
      <dialog
        onClose={(e) => {
          e.currentTarget.querySelector("form")?.reset();
          setIsOpen(false);
        }}
        ref={dialogRef}
        className='backdrop:bg-black/75 border border-none rounded-2xl p-6 bg-background  max-w-md w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
        <h2 className='mb-4'>Create Training Plan</h2>
        {isOpen && <CreatePlanForm ref={dialogRef} />}
      </dialog>
    </>
  );
};
