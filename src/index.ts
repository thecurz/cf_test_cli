import http from "http";
import { z } from "zod";
import { testArraySchema, bodySchema } from "./schemas";
// port accepted by Competitive Companion
const PORT = 1327;

const server = http.createServer(ExtensionRequestHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function ExtensionRequestHandler(req: any, res: any): void {
  res.writeHead(200, { "Content-Type": "text/plain" });
  if (req.method !== "POST") {
    res.end("OK");
    console.error("Invalid request method");
  }
  let tests: z.infer<typeof testArraySchema> = [];
  req.on("data", (chunk: any) => {
    const data = JSON.parse(chunk);
    const parsedData = bodySchema.safeParse(data);
    if (!parsedData.success) {
      console.error(parsedData.error);
    }
    tests = data.tests;
    validateProgram(tests);
  });

  req.on("end", () => {
    res.end("OK");
  });
}

function validateProgram(tests: z.infer<typeof testArraySchema>): void {
  var passedTests = 0;
  var failedTests = 0;
  tests.forEach((test) => {
    console.log(test.input);
    console.log(test.output);
    const result = callProgram("", test.input);
    const assertionResult = assertTestResult(result, test.output);
    console.log(assertionResult);
    if (assertionResult) {
      passedTests++;
    } else {
      failedTests++;
    }
  });
}
function callProgram(src: string, input: string): string {
  // TODO: all for different languages
  // TODO: implement
  return "";
}

function assertTestResult(result: string, expected: string): boolean {
  // TODO: implement more complex comparison
  if (result !== expected) {
    return false;
  }
  return true;
}
