import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'info',
        options: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss' },
      },
      {
        target: 'pino/file',
        level: 'debug',
        options: { destination: path.join(logsDir, 'app.log') },
      },
    ],
  },
});
