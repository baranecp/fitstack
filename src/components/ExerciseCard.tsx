import { Pen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export const ExerciseCard = ({
  exerciseName,
  sets,
  reps,
  weight,
  notes,
  onEdit,
}: {
  exerciseName: string;
  sets: number;
  reps: string;
  weight: string;
  notes: string | null;
  onEdit: () => void;
}) => {
  return (
    <article className='flex flex-col gap-4 p-4 border border-border-card hover:border-border-card-hover rounded-2xl'>
      <header className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <span
            className='bg-primary px-3 py-1 rounded-sm'
            aria-label='Exercise order'>
            1
          </span>
          <h3 className='font-semibold'>{exerciseName}</h3>
        </div>

        <div className='flex gap-1'>
          <Button
            variant='ghost'
            className='p-2'
            aria-label='Edit exercise'
            onClick={onEdit}>
            <Pen />
          </Button>
          <Button
            variant='destructive'
            className='p-2'
            aria-label='Delete exercise'>
            <Trash2 />
          </Button>
        </div>
      </header>
      <dl className='flex gap-6'>
        <div>
          <dt className='text-sm text-muted-foreground'>Sets</dt>
          <dd className='font-medium'>{sets}</dd>
        </div>
        <div>
          <dt className='text-sm text-muted-foreground'>Reps</dt>
          <dd className='font-medium'>{reps}</dd>
        </div>
        <div>
          <dt className='text-sm text-muted-foreground'>Weight</dt>
          <dd className='font-medium'>{weight}</dd>
        </div>
      </dl>
      <section className='p-4 bg-blue-300 rounded-2xl'>
        <p>{notes}</p>
      </section>
    </article>
  );
};
