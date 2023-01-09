import type { NextApiRequest, NextApiResponse } from 'next';
import { Task } from '../../../types/taskType';
import { ResponseApi } from '../../../types/responseType';
import { Tasks, setTasks } from '.';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseApi<Task | {}>>) {
  return new Promise<void>((resolve, reject) => {
    try {
      const { query } = req;
      const { id } = query as { id: string };

      if (req.method === 'GET') {
        const selectedTask = Tasks.find((task) => task.id === id) || ({} as Task);
        if (selectedTask) {
          res.status(200).json({
            message: 'Data fetched',
            status: 200,
            data: selectedTask,
          });
          resolve();
        }
        res.status(404).json({
          message: `Task with id: ${id} not found.`,
          status: 404,
          data: {},
        });
        reject();
      } else if (req.method === 'POST') {
        const task = JSON.parse(req.body);

        if (Tasks.find((_task) => _task.id === task.id)) {
          setTasks(Tasks.map((_task) => (_task.id === task.id ? task : _task)));
        } else {
          Tasks.push(task);
        }

        res.status(201).json({
          message: `Task is created`,
          status: 201,
          data: task,
        });

        resolve();
      } else if (req.method === 'DELETE') {
        const selectedTask = Tasks.find((task) => task.id === id);
        if (selectedTask) {
          const filteredTasks = Tasks.filter((task) => task.id !== id);

          setTasks(filteredTasks);

          res.status(200).json({
            message: `Task is deleted`,
            status: 200,
            data: selectedTask,
          });

          resolve();
        } else {
          res.status(404).json({
            message: `Task with id: ${id} not found.`,
            status: 404,
            data: {},
          });
          reject();
        }
      }
    } catch (error) {
      res.status(500).json({
        message: 'Something is wrong',
        status: 500,
        data: [],
      });
      reject();
    }
  });
}
