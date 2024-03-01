import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

export const makePersistedNamespaced = <T>(def: T, name: string) => makePersisted(createSignal(def), { name: `.wpc.${name}` })