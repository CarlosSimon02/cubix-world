import { env } from "@/config/env";

const debugLog = (context: string, message: string, data?: unknown) => {
  if (env.NODE_ENV === "development") {
    const logMessage = `[${context}]: ${message}`;
    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }
};

export default debugLog;
