import { Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-inner">
        <Layers className="w-8 h-8" />
      </div>

      <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Page Not Found
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        The link you followed may be broken, or the page may have been moved or deleted.
      </p>

      <Link to="/dashboard">
        <Button variant="primary">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}

