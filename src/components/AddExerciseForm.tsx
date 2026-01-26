export const AddExerciseForm = () => {
  return (
    <form className='flex flex-col gap-4 border border-border-card hover:border-border-card-hover p-4 mb-4 rounded-2xl'>
      <fieldset className='flex flex-col gap-2'>
        <legend className='sr-only'>Exercise details</legend>

        <label htmlFor='exercise_name'>Exercise Name</label>
        <input
          id='exercise_name'
          name='exercise_name'
          defaultValue='New Exercise'
          type='text'
        />
      </fieldset>

      <fieldset className='flex gap-4'>
        <legend className='sr-only'>Training parameters</legend>

        <div>
          <label htmlFor='exercise_sets' className='block mb-2'>
            Sets
          </label>
          <input
            id='exercise_sets'
            name='exercise_sets'
            defaultValue={3}
            type='number'
            min={1}
          />
        </div>

        <div>
          <label htmlFor='exercise_reps' className='block mb-2'>
            Reps
          </label>
          <input
            id='exercise_reps'
            name='exercise_reps'
            defaultValue={10}
            type='number'
            min={1}
          />
        </div>

        <div>
          <label htmlFor='exercise_weights' className='block mb-2'>
            Weight
          </label>
          <input
            id='exercise_weights'
            name='exercise_weights'
            placeholder='e.g., 185 lb'
            type='text'
          />
        </div>
      </fieldset>

      <fieldset className='flex flex-col'>
        <legend className='sr-only'>Notes</legend>

        <label htmlFor='exercise_notes' className='block mb-2'>
          Notes
        </label>
        <textarea
          id='exercise_notes'
          name='exercise_notes'
          placeholder='Add any notes or tips...'
          rows={2}
          className='resize-none'
        />
      </fieldset>
    </form>
  );
};
