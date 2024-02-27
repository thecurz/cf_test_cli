import { z } from "zod";

const testArraySchema = z.array(
  z.object({ input: z.string(), output: z.string() }).passthrough(),
);
const bodySchema = z
  .object({
    tests: testArraySchema,
  })
  .passthrough();
export { bodySchema, testArraySchema };
