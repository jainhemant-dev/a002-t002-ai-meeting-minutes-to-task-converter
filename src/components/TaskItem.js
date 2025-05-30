'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/tasksSlice';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [formattedDate, setFormattedDate] = useState('-');
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    if (task?.dueDate) {
      try {
        setFormattedDate(format(new Date(task.dueDate), 'h:mm a, d MMM'));
      } catch {
        setFormattedDate('-');
      }
    }
  }, [task?.dueDate]);

  const priorityColors = {
    P1: 'bg-red-100 text-red-800',
    P2: 'bg-orange-100 text-orange-800',
    P3: 'bg-blue-100 text-blue-800',
    P4: 'bg-green-100 text-green-800',
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsEditing(false);
    toast.success('Task updated successfully!');
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task deleted successfully!');
  };

  if (!mounted || !task) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="col-span-1">
            <input
              type="text"
              value={editedTask.taskName || ''}
              onChange={(e) => setEditedTask({ ...editedTask, taskName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task name"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              value={editedTask.assignee || ''}
              onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
              placeholder="Assignee"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <input
              type="datetime-local"
              value={editedTask.dueDate || ''}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <select
              value={editedTask.priority || 'P4'}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1 truncate font-medium">{task.taskName || ''}</div>
        <div className="col-span-1 text-gray-600">
          {task.assignee || '-'}
        </div>
        <div className="col-span-1 text-gray-600">
          {formattedDate}
        </div>
        <div className="col-span-1 flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority || 'P4']}`}>
            {task.priority || 'P4'}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
