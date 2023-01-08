import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { Task } from '../../../types/taskType';
import { ResponseApi } from '../../../types/responseType';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseApi<Task | {}>>) {
  return new Promise<void>((resolve, reject) => {
    const { query } = req;
    const { id } = query as { id: string };

    fs.readFile('./tasks.json', 'utf8', (err, jsonString) => {
      let tasks: Task[] = JSON.parse(jsonString);

      if (err) {
        res.status(500).json({
          message: 'Something is wrong',
          status: 500,
          data: [],
        });
        reject();
      }

      if (req.method === 'GET') {
        const selectedTask = tasks.find((task) => task.id === id) || ({} as Task);
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

        if (tasks.find((_task) => _task.id === task.id)) {
          tasks = tasks.map((_task) => (_task.id === task.id ? task : _task));
        } else {
          tasks.push(task);
        }

        fs.writeFile('./tasks.json', JSON.stringify(tasks), 'utf8', (err) => {
          res.status(500).json({
            message: 'Something is wrong',
            status: 500,
            data: [],
          });
          reject();
        });

        res.status(201).json({
          message: `Task is created`,
          status: 201,
          data: task,
        });

        resolve();
      } else if (req.method === 'DELETE') {
        const selectedTask = tasks.find((task) => task.id === id);
        if (selectedTask) {
          const filteredTask = tasks.filter((task) => task.id !== id);

          fs.writeFile('./tasks.json', JSON.stringify(filteredTask), 'utf8', (err) => {
            res.status(500).json({
              message: 'Something is wrong',
              status: 500,
              data: [],
            });
            reject();
          });

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
    });
  });
}
