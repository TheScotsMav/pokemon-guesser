import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "../_components/ui/button";

const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
];

export default async function loadingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
            <h1 className="text-6xl font-bold text-center">Gen 1</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                    <CardDescription>Which type is it?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-24 w-24 rounded bg-gray-400" />
                    <form className="flex flex-col space-y-2">
                        <select
                            name="typeSelect"
                            className="rounded text-black p-1"
                        >
                            {pokemonTypes.sort().map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <Button variant={"outline"} disabled>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
