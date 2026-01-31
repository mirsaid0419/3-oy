import { join } from "path";
import Winston from "winston";

const shortFormat = Winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    let location = "";
    if (stack) {
      const stackLines = stack.split("\n");
      location = stackLines[1] ? stackLines[1].trim() : "";
    }
    return `${timestamp} [${level}]: ${message} | Location: ${location}`;
  }
);

const winston = Winston.createLogger({
  level: "info",
  format: Winston.format.combine(
    Winston.format.errors({ stack: true }),
    Winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    shortFormat
  ),
  transports: [
    new Winston.transports.File({
      filename: join(process.cwd(), "src", "logs", "error.log"),
    }),
  ],
});

export default winston;
