import { getExercises } from "@/services/exercises";
import CreatePlanForm from "./CreatePlanForm";

const Create = async () => {
  const exercises = await getExercises();

  return <CreatePlanForm exercises={exercises} />;
};

export default Create;
