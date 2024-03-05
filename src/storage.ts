import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

export const makePersistedNamespaced = <T>(def: T, name: string, version?: number) => makePersisted(createSignal(def), { name: `.wpc.v${version??1}.${name}` })