'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, setError, setLoading } from '../redux/tasksSlice';
import { parseTranscript } from '../utils/gemini';
import toast from 'react-hot-toast';

export default function TranscriptInput() {
    const [transcript, setTranscript] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transcript.trim()) return;

        dispatch(setLoading(true));
        try {
            const tasks = await parseTranscript(transcript);

            // Add each task with a unique ID
            tasks.forEach(task => {
                dispatch(addTask({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    ...task,
                    createdAt: new Date().toISOString(),
                }));
            });

            setTranscript('');
            toast.success(`${tasks.length} tasks added successfully!`);
        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Failed to parse transcript. Please try again.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
            <div className="flex flex-col gap-2">
                <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Paste your meeting transcript here (e.g., 'Aman takes landing page by 10pm tomorrow. Rajeev handles client follow-up by Wednesday...')"
                    className="w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 min-h-[120px] resize-y"
                />
                <button
                    type="submit"
                    disabled={!transcript.trim()}
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Extract Tasks
                </button>
            </div>
        </form>
    );
}
