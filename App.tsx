import React, { useState, useEffect } from 'react';
import { Search, Globe, Sparkles, Filter as FilterIcon, RotateCw, LogOut } from 'lucide-react';
import { Opportunity, FilterState, INITIAL_FILTERS, User, ViewMode } from './types';
import { fetchOpportunities } from './services/geminiService';
import OpportunityCard from './components/OpportunityCard';
import Sidebar from './components/FilterSidebar';
import StatsChart from './components/StatsChart';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  // --- Authentication State ---
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Routing State
  const [showLanding, setShowLanding] = useState(!user);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // --- App State ---
  const [query, setQuery] = useState('');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('discover');
  
  // --- Saved Opportunities State ---
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('savedIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // --- Effects ---

  // Persist User
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setShowLanding(false);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Persist Saved IDs
  useEffect(() => {
    localStorage.setItem('savedIds', JSON.stringify(Array.from(savedIds)));
  }, [savedIds]);

  // Initial Search Load
  useEffect(() => {
    if (user && opportunities.length === 0) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --- Handlers ---

  const handleNavigateToAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowLanding(false);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setUser(null);
    setOpportunities([]);
    setSavedIds(new Set());
    setViewMode('discover');
    setHasSearched(false);
    setShowLanding(true);
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    setLoading(true);
    setHasSearched(true);
    const results = await fetchOpportunities(query || undefined);
    setOpportunities(results);
    setLoading(false);
  };

  // --- Filtering Logic ---

  const filteredOpportunities = opportunities.filter(op => {
    // 1. View Mode Filter
    if (viewMode === 'saved' && !savedIds.has(op.id)) return false;

    // 2. Sidebar Filters
    const matchesCategory = filters.category === 'All' || op.category === filters.category;
    const matchesType = filters.type === 'All' || op.type === filters.type;
    const matchesLevel = filters.level === 'All' || op.level === filters.level;
    const matchesPaid = !filters.onlyPaid || op.isPaid;
    
    return matchesCategory && matchesType && matchesLevel && matchesPaid;
  });

  // --- Rendering ---

  if (!user) {
    if (showLanding) {
      return <LandingPage onNavigateToAuth={handleNavigateToAuth} />;
    }
    return (
      <AuthPage 
        onLogin={handleLogin} 
        defaultView={authMode} 
        onBack={() => setShowLanding(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-baby-50 font-sans text-slate-800 selection:bg-love-100 selection:text-love-600">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-baby-100 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-baby-400 p-2.5 rounded-xl shadow-lg shadow-baby-400/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-baby-900">Opportunity<span className="text-baby-400">Hub</span></span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* User & Logout */}
             <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-baby-100">
                <div className="w-9 h-9 rounded-full bg-baby-100 border border-baby-200 flex items-center justify-center text-baby-600 font-bold text-sm">
                   {user?.name.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-baby-400 hover:text-love-500 hover:bg-love-50 rounded-xl transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
             </div>

             <button 
               className="lg:hidden p-2.5 bg-white border border-baby-200 rounded-xl hover:bg-baby-50 text-baby-500"
               onClick={() => setIsSidebarOpen(true)}
             >
               <FilterIcon className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Navigation Sidebar */}
          <Sidebar 
            filters={filters} 
            setFilters={setFilters} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            
            {/* Hero Section (Only in Discover Mode) */}
            {viewMode === 'discover' && (
              <div className="bg-white rounded-3xl p-8 lg:p-12 mb-8 relative overflow-hidden shadow-xl shadow-baby-200/40 border border-baby-100">
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-3xl lg:text-5xl font-bold text-baby-900 mb-6 leading-tight">
                    Find your next <span className="text-love-400">big break</span>.
                  </h1>
                  <p className="text-slate-500 text-lg mb-8 max-w-lg">
                    AI-powered search for internships, hackathons, and competitions. Verified and categorized instantly.
                  </p>
                  
                  <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-baby-300 group-focus-within:text-baby-500 transition-colors" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search opportunities..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-baby-100 bg-baby-50/50 focus:border-baby-300 focus:bg-white focus:ring-4 focus:ring-baby-100 transition-all outline-none text-slate-800 placeholder:text-baby-300 shadow-inner"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="bg-love-400 hover:bg-love-500 text-white px-6 lg:px-8 rounded-2xl font-bold transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-love-400/30 active:scale-95"
                    >
                      {loading ? <RotateCw className="w-5 h-5 animate-spin" /> : 'Search'}
                    </button>
                  </form>
                </div>
                
                {/* Decorative Background Elements */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-baby-100/50 to-transparent pointer-events-none"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-love-50 rounded-full blur-3xl pointer-events-none opacity-60"></div>
                <div className="absolute right-20 bottom-0 w-64 h-64 bg-baby-100/40 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            )}

            {/* Charts */}
            {!loading && opportunities.length > 0 && viewMode === 'discover' && (
              <StatsChart opportunities={opportunities} />
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-baby-900">
                {viewMode === 'saved' ? 'Saved Opportunities' : (query ? `Results for "${query}"` : 'Recommended for you')}
              </h2>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-baby-500 border border-baby-200 shadow-sm">
                {filteredOpportunities.length} Items
              </span>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-baby-100"></div>
                ))}
              </div>
            ) : filteredOpportunities.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                {filteredOpportunities.map(op => (
                  <OpportunityCard 
                    key={op.id} 
                    opportunity={op} 
                    isSaved={savedIds.has(op.id)}
                    onToggleSave={toggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-baby-200">
                <div className="mx-auto w-20 h-20 bg-baby-50 rounded-full flex items-center justify-center mb-6 border border-baby-100">
                  {viewMode === 'saved' ? <Sparkles className="w-8 h-8 text-love-300" /> : <Search className="w-8 h-8 text-baby-300" />}
                </div>
                <h3 className="text-xl font-bold text-baby-900 mb-2">
                  {viewMode === 'saved' ? 'No saved items yet' : 'No opportunities found'}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {viewMode === 'saved' 
                    ? 'Start exploring and save opportunities to build your collection.' 
                    : 'Try adjusting your search terms. We use live Google Search data, so be specific!'}
                </p>
                {viewMode === 'saved' && (
                  <button onClick={() => setViewMode('discover')} className="mt-6 text-love-500 font-semibold hover:underline">
                    Go to Discover
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;