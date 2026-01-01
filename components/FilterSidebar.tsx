import React from 'react';
import { FilterState, CATEGORIES, TYPES, LEVELS, ViewMode } from '../types';
import { Filter, X, Compass, Bookmark } from 'lucide-react';

interface Props {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Sidebar: React.FC<Props> = ({ 
  filters, 
  setFilters, 
  isOpen, 
  onClose, 
  viewMode, 
  setViewMode
}) => {
  const handleChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden backdrop-blur-sm" onClick={onClose}></div>
      )}

      <aside className={`fixed lg:sticky lg:top-24 top-0 left-0 h-full lg:h-[calc(100vh-6rem)] w-72 bg-white lg:bg-transparent shadow-2xl lg:shadow-none z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto p-4 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-baby-900">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-baby-50 rounded-full text-baby-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="bg-white p-2 rounded-3xl shadow-sm border border-baby-100 mb-6">
          <button 
            onClick={() => setViewMode('discover')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all mb-1 ${
              viewMode === 'discover' 
                ? 'bg-baby-400 text-white shadow-lg shadow-baby-400/20' 
                : 'text-slate-500 hover:bg-baby-50 hover:text-baby-900'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="font-semibold">Discover</span>
          </button>
          
          <button 
            onClick={() => setViewMode('saved')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              viewMode === 'saved' 
                ? 'bg-love-400 text-white shadow-lg shadow-love-400/20' 
                : 'text-slate-500 hover:bg-love-50 hover:text-love-600'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="font-semibold">Saved</span>
          </button>
        </div>

        {/* Filters Section */}
        {viewMode === 'discover' && (
          <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-baby-100 mb-6 overflow-y-auto custom-scrollbar">
             <div className="flex items-center gap-2 mb-6">
               <Filter className="w-4 h-4 text-baby-300" />
               <h3 className="text-xs font-bold text-baby-300 uppercase tracking-wider">Smart Filters</h3>
             </div>

            <div className="space-y-8">
              {/* Scope/Level Filter */}
              <div>
                <h3 className="text-sm font-medium text-slate-800 mb-3">Scope</h3>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => handleChange('level', level)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        filters.level === level
                          ? 'bg-baby-400 text-white shadow-md'
                          : 'bg-baby-50 text-slate-500 hover:bg-baby-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-slate-800 mb-3">Domain</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border transition-all ${
                        filters.category === cat 
                          ? 'border-4 border-baby-400' 
                          : 'border-slate-300 group-hover:border-baby-300'
                      }`} />
                      <input 
                        type="radio" 
                        name="category" 
                        className="hidden"
                        checked={filters.category === cat}
                        onChange={() => handleChange('category', cat)}
                      />
                      <span className={`text-sm ${filters.category === cat ? 'text-baby-900 font-medium' : 'text-slate-500'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div>
                <h3 className="text-sm font-medium text-slate-800 mb-3">Type</h3>
                <div className="space-y-2">
                  {TYPES.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border transition-all ${
                        filters.type === type 
                          ? 'border-4 border-baby-400' 
                          : 'border-slate-300 group-hover:border-baby-300'
                      }`} />
                       <input 
                        type="radio" 
                        name="type" 
                        className="hidden"
                        checked={filters.type === type}
                        onChange={() => handleChange('type', type)}
                      />
                      <span className={`text-sm ${filters.type === type ? 'text-baby-900 font-medium' : 'text-slate-500'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Paid Only Toggle */}
              <div className="pt-4 border-t border-baby-100">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-800">Paid Only</span>
                  <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${filters.onlyPaid ? 'bg-love-400' : 'bg-slate-200'}`}>
                    <div className={`bg-white w-5 h-5 rounded-full shadow-sm absolute top-1 left-1 transition-transform duration-200 ease-in-out ${filters.onlyPaid ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={filters.onlyPaid}
                    onChange={(e) => handleChange('onlyPaid', e.target.checked)}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;