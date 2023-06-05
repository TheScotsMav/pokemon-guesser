"use server";
import { revalidatePath } from "next/cache";

export async function aTestAction(formData: FormData) {
  console.log("formData", formData);
  //const chosenType = formData.get("typeSelect");
  // console.log("chosenType", chosenType);
  revalidatePath("/gen1");
}
