import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { Task } from '../../../types/taskType';
import { ResponseApi } from '../../../types/responseType';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseApi<Task | {}>>) {
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
      return;
    }
    if (req.method === 'GET') {
      const selectedTask = tasks.find((task) => task.id === id) || ({} as Task);
      return selectedTask
        ? res.status(200).json({
            message: 'Data fetched',
            status: 200,
            data: selectedTask,
          })
        : res.status(404).json({
            message: `Task with id: ${id} not found.`,
            status: 404,
            data: {},
          });
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
      });

      res.status(201).json({
        message: `Task is created`,
        status: 201,
        data: task,
      });
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
        });
        res.status(200).json({
          message: `Task is deleted`,
          status: 200,
          data: selectedTask,
        });
      } else {
        res.status(404).json({
          message: `Task with id: ${id} not found.`,
          status: 404,
          data: {},
        });
      }
    }
  });
}
