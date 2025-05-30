'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, setError, setLoading } from '../redux/tasksSlice';
import { parseTask } from '../utils/gemini';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function TaskInput() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure Redux state is in sync with localStorage on mount
    if (typeof window !== 'undefined') {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        try {
          const parsed = JSON.parse(tasks);
          // Optionally, dispatch an action to set tasks if needed
          // dispatch(setTasks(parsed));
        } catch { }
      }
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(setLoading(true));
    try {
      const parsedTask = await parseTask(input);
      dispatch(addTask({
        id: Date.now().toString(),
        ...parsedTask,
        createdAt: new Date().toISOString(),
      }));
      setInput('');
      toast.success('Task added successfully!');
    } catch (error) {
      dispatch(setError(error.message));
      toast.error('Failed to add task. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task in natural language (e.g., 'Finish landing page by 11pm 20th June')"
          className="w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
