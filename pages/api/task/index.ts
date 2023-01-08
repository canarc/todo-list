import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { ResponseApi } from '@/types/responseType';
import { Task } from '@/types/taskType';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseApi<Task[]>>) {
  return new Promise<void>((resolve, reject) => {
    const jsonDirectory = process.cwd() + '/tmp/tasks.json';

    fs.readFile(jsonDirectory, 'utf8', (err, jsonString) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error', status: 500, data: [] });
        reject();
      }

      const tasks: Task[] = JSON.parse(jsonString);
      res.status(200).json({ message: 'Data fetched', status: 200, data: tasks });
      resolve();
    });
  });
}
