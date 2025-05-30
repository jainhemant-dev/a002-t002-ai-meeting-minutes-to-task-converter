'use client';

import { useState } from 'react';
import TaskInput from '../components/TaskInput';
import TranscriptInput from '../components/TranscriptInput';
import TaskList from '../components/TaskList';

export default function Home() {
  const [mode, setMode] = useState('task'); // 'task' or 'transcript'

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Task Manager
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Add tasks using natural language or extract them from meeting minutes!
          </p>

          {/* Input Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            {/* <button
              onClick={() => setMode('task')}
              className={`px-4 py-2 rounded-lg transition-colors ${mode === 'task'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Single Task
            </button> */}
            <button
              onClick={() => setMode('transcript')}
              className={`px-4 py-2 rounded-lg transition-colors ${mode === 'transcript'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Meeting Minutes
            </button>
          </div>
        </div>

        {mode === 'task' ? <TaskInput /> : <TranscriptInput />}
        <TaskList />
      </div>
    </main>
  );
}
