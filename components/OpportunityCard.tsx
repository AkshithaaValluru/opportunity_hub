import React from 'react';
import { Opportunity } from '../types';
import { Calendar, MapPin, ExternalLink, BadgeCheck, Briefcase, Code, Award, Zap, Bookmark, Flag } from 'lucide-react';

interface Props {
  opportunity: Opportunity;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Hackathon': return <Code className="w-4 h-4" />;
    case 'Competition': return <Award className="w-4 h-4" />;
    case 'Internship': return <Briefcase className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

const OpportunityCard: React.FC<Props> = ({ opportunity, isSaved, onToggleSave }) => {
  const isExpired = new Date(opportunity.deadline) < new Date();
  
  return (
    <div className="group bg-white rounded-3xl p-1 shadow-sm hover:shadow-xl hover:shadow-baby-200/50 border border-baby-100 hover:border-baby-300 transition-all duration-300 flex flex-col h-full relative">
      <div className="absolute top-5 right-5 z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(opportunity.id);
          }}
          className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isSaved 
              ? 'bg-love-400 text-white shadow-md' 
              : 'bg-white text-baby-300 hover:bg-baby-50 hover:text-baby-600 shadow-sm border border-baby-100'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
             opportunity.type === 'Hackathon' ? 'bg-love-50 border-love-100 text-love-500' :
             opportunity.type === 'Internship' ? 'bg-baby-50 border-baby-100 text-baby-500' :
             'bg-baby-100 border-baby-200 text-baby-600'
          }`}>
            {getTypeIcon(opportunity.type)}
          </div>
          <div>
            <div className="flex items-center gap-1">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{opportunity.type}</span>
               {opportunity.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-baby-400" />}
            </div>
            <div className="text-xs text-baby-400">{opportunity.category}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-baby-600 transition-colors">
          {opportunity.title}
        </h3>
        
        <p className="text-slate-500 text-sm font-medium mb-4">{opportunity.organization}</p>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {opportunity.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2 text-slate-500 bg-baby-50 p-2 rounded-xl border border-baby-100">
               <MapPin className="w-4 h-4 text-baby-400" />
               <span className="truncate max-w-[120px]">{opportunity.location}</span>
             </div>
             <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
               opportunity.level === 'International' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
               opportunity.level === 'National' ? 'bg-love-50 text-love-500 border-love-100' :
               'bg-slate-50 text-slate-500 border-slate-200'
             }`}>
               <Flag className="w-3 h-3" />
               {opportunity.level}
             </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2 text-slate-500 bg-baby-50 p-2 rounded-xl border border-baby-100">
                <Calendar className={`w-4 h-4 ${isExpired ? 'text-love-400' : 'text-baby-400'}`} />
                <span className={isExpired ? 'text-love-500 font-medium' : ''}>
                  {opportunity.deadline}
                </span>
             </div>
             <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
               opportunity.isPaid ? 'bg-baby-100 text-baby-600 border-baby-200' : 'bg-slate-50 text-slate-500 border-slate-200'
             }`}>
               {opportunity.isPaid ? 'Paid' : 'Unpaid'}
             </div>
          </div>
        </div>
      </div>

      <a 
        href={opportunity.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mx-6 mb-6 mt-2 flex items-center justify-center gap-2 bg-baby-400 text-white py-3.5 rounded-2xl text-sm font-semibold hover:bg-baby-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-baby-400/20"
      >
        Apply Now
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

export default OpportunityCard;