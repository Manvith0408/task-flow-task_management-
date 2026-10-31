import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  Sparkles,
  Check,
  Star
} from 'lucide-react';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight">TaskFlow</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          {user ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm">
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-purple-500/15 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Task Execution for High Performers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-950 dark:text-white leading-[1.15] mb-6">
            Organize daily tasks. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Deliver projects faster.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            A fast, minimal, and responsive workspace designed after Linear and Notion. Stay on top of your deadlines, prioritize what matters, and track progress with clarity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link to={user ? "/dashboard" : "/register"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-600/25">
                <span>Start Free Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Product Preview Card */}
          <div className="relative mx-auto max-w-4xl rounded-2xl p-2 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-2xl">
            <div className="rounded-xl bg-white dark:bg-gray-900 p-6 sm:p-8 text-left border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-gray-400 ml-2">TaskFlow Pro Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Real-time Sync Active</span>
                </div>
              </div>

              {/* Sample Task List Mock */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold line-through text-gray-400 dark:text-gray-500">
                        Design Landing page & component architecture
                      </p>
                      <span className="text-[11px] text-gray-400">Design • Completed</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                    Done
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Implement JWT auth & MongoDB schema validation
                      </p>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">Engineering • Due Today</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                    High Priority
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border border-gray-300 dark:border-gray-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Connect Socket.IO client for live multi-tab syncing
                      </p>
                      <span className="text-[11px] text-gray-400">Integration • Due Tomorrow</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Engineered for productivity & speed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Every detail is designed to remove friction, so you can focus on shipping your best work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Lightning Fast CRUD
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Create, organize, categorize, and mark tasks with quick keyboard interactions and instant optimistic updates.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Visual Analytics & Metrics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Monitor task completion rates, track overdue milestones, and identify productivity trends directly from your dashboard.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Secure & Isolated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                JWT tokens with bcrypt password encryption. Your tasks and credentials are safe and accessible only to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© 2026 TaskFlow Inc. Built with React, Tailwind CSS, Express, and MongoDB.</p>
      </footer>
    </div>
  );
}

