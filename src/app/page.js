import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Task Manager
          </h1>
          <p className="text-lg text-gray-600">
            Add tasks using natural language - we'll understand what you mean!
          </p>
        </div>

        <TaskInput />
        <TaskList />
      </div>
    </main>
  );
}
