import { searchExercise } from "@/app/exercises/actions";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export const ExerciseSearchInput = ({
  value,
  onChange,
  onSelect,
}: {
  value: string;
  onChange: (val: string) => void;
  onSelect: (id: number | null, name: string) => void;
}) => {
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(value, 300);

  // Search effect
  useEffect(() => {
    const fetchExercises = async () => {
      if (debouncedSearch.length < 2) {
        setResults([]);
        return;
      }
      const data = await searchExercise({ exerciseName: debouncedSearch });
      setResults(data);
      if (data.length > 0) setIsOpen(true);
    };
    fetchExercises();
  }, [debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    onSelect(null, e.target.value);
    setIsOpen(true);
  };

  return (
    <div className='relative w-full'>
      <label htmlFor='exercise_name' className='text-sm font-medium mb-1 block'>
        Exercise Name
      </label>
      <input
        id='exercise_name'
        type='text'
        className='w-full border border-border-card rounded-lg p-2 bg-background focus:ring-2 focus:ring-primary/20 outline-none'
        value={value}
        autoComplete='off'
        placeholder='Search or type new exercise...'
        onChange={handleInputChange}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
      />

      {isOpen && results.length > 0 && (
        <div className='absolute top-full left-0 w-full bg-white border border-border-card rounded-xl shadow-lg z-50 mt-1 max-h-60 overflow-y-auto'>
          {results.map((ex) => (
            <button
              key={ex.id}
              type='button'
              className='w-full text-left p-3 hover:bg-gray-50 text-sm border-b last:border-0 border-gray-100'
              onClick={() => {
                onSelect(ex.id, ex.name);
                setIsOpen(false);
              }}>
              {ex.name}
            </button>
          ))}
          <div className='p-2 text-xs text-center text-gray-400 bg-gray-50'>
            Type to create custom exercise
          </div>
        </div>
      )}
    </div>
  );
};
