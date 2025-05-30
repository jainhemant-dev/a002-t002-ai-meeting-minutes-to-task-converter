'use client';

import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;  // Return null on server-side to prevent hydration mismatch
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks yet. Add your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
