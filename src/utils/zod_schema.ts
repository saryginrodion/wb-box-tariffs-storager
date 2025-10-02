import z from "zod"
import { parseFloatWithComma } from "./numbers.js";

export const newSchemaFromInterface = <T>() => {
    return <S extends z.ZodTypeAny>(
        schema: S & (z.infer<S> extends T ? unknown : "Uncompatible schema with type")
    ) => schema;
}

export const FloatWithCommaOptional = z.union([z.string(), z.number()]).transform((val, _ctx) => {
    if (typeof val === "number") {
        return val;
    }

    try {
        return parseFloatWithComma(val);
    } catch (err) {
        return undefined;
    }
});
