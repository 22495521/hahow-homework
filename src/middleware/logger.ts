import morgan from 'morgan';
import { Request, Response } from 'express';

// 自訂 morgan 格式與顏色
morgan.token('status', (req: Request, res: Response) => {
  const status = res.statusCode;
  const color = status >= 500 ? 31 // red
    : status >= 400 ? 33 // yellow
    : status >= 300 ? 36 // cyan
    : status >= 200 ? 32 // green
    : 0; // no color
  return `\x1b[${color}m${status}\x1b[0m`;
});

morgan.token('method', (req: Request) => {
  const method = req.method;
  const color = method === 'GET' ? 32 // green
    : method === 'POST' ? 34 // blue
    : method === 'PUT' ? 33 // yellow
    : method === 'DELETE' ? 31 // red
    : 36; // cyan
  return `\x1b[${color}m${method}\x1b[0m`;
});

export const logger = morgan(':method :url :status :res[content-length] - :response-time ms');