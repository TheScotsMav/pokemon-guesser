import { aTestAction } from "../_actions/aTestAction";
import { Button } from "@/app/_components/ui/button";

export const PokemonHolder = () => {
  return (
    <form action={aTestAction} className="flex flex-col space-y-2">
      <select name="typeSelect" className="rounded text-black p-1">
        <option>1</option>
        <option>2</option>
      </select>
      <Button variant={"outline"}>click ME! </Button>
    </form>
  );
};
