import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseApi } from '@/types/responseType';
import { Task } from '@/types/taskType';

export let Tasks = [] as Task[];

export const setTasks = (tasks: Task[]) => {
  Tasks = tasks;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseApi<Task[]>>) {
  return new Promise<void>((resolve, reject) => {
    try {
      res.status(200).json({ message: 'Data fetched', status: 200, data: Tasks });
      resolve();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', status: 500, data: [] });
      reject();
    }
  });
}
