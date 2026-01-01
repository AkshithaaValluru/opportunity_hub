import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Zap, Code, Briefcase, Award, Rocket, CheckCircle2, Search, Cpu } from 'lucide-react';

interface Props {
  onNavigateToAuth: (mode: 'login' | 'signup') => void;
}

const LandingPage: React.FC<Props> = ({ onNavigateToAuth }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-baby-50 font-sans text-slate-800 overflow-x-hidden selection:bg-love-100 selection:text-love-600">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-baby-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-baby-400 p-2 rounded-xl shadow-md shadow-baby-400/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-baby-900">
              Opportunity<span className="text-baby-400">Hub</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigateToAuth('login')}
              className="text-sm font-medium text-baby-700 hover:text-baby-900 transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="group relative px-6 py-2.5 bg-love-400 rounded-lg text-sm font-bold text-white overflow-hidden transition-all hover:bg-love-500 shadow-lg shadow-love-400/30"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-love-100 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-baby-200 via-transparent to-transparent opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-800">
                Your <span className="text-baby-400">Central Hub</span> <br/>
                for Global Success.
              </h1>
              
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop searching, start finding. The only AI-powered platform that aggregates, validates, and categorizes student opportunities from around the world in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => onNavigateToAuth('signup')}
                  className="w-full sm:w-auto px-8 py-4 bg-baby-400 text-white rounded-xl font-bold text-lg hover:bg-baby-500 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-baby-400/30"
                >
                  Explore Opportunities
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigateToAuth('login')}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-baby-700 border border-baby-200 rounded-xl font-bold text-lg hover:bg-baby-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-5 h-5 text-baby-400" />
                  Search Now
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-love-400" />
                  <span>Verified Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-love-400" />
                  <span>Free for Students</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Floating Elements */}
            <div className="flex-1 w-full relative h-[500px] hidden lg:block perspective-1000">
              {/* Central Hub Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-baby-200 z-20 border border-baby-100">
                <Globe className="w-16 h-16 text-baby-400 animate-spin-slow" />
              </div>

              {/* Orbiting Elements */}
              {[
                { icon: Code, label: "Hackathons", pos: "top-0 right-10", delay: "0s" },
                { icon: Briefcase, label: "Internships", pos: "bottom-20 left-10", delay: "1s" },
                { icon: Award, label: "Competitions", pos: "top-20 left-0", delay: "2s" },
                { icon: Rocket, label: "Startups", pos: "bottom-0 right-20", delay: "3s" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`absolute ${item.pos} animate-float`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-baby-200/50 border border-baby-100 transform hover:scale-110 transition-transform cursor-pointer">
                    <div className="bg-baby-50 p-2.5 rounded-lg">
                      <item.icon className="w-5 h-5 text-baby-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{item.label}</div>
                      <div className="text-xs text-baby-400">Active</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-baby-900 mb-6">Why use Opportunity<span className="text-love-400">Hub</span>?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We don't just list jobs. We engineer your career path with intelligent tools designed for the modern student.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Categorization",
              desc: "Gemini 3.0 automatically tags opportunities by domain (AI, Law, Sports) so you only see what matters.",
              icon: Cpu,
            },
            {
              title: "Deadline Watchdog",
              desc: "Never apply to an expired link again. Our system validates deadlines in real-time, removing dead ends.",
              icon: Zap,
            },
            {
              title: "Global Search",
              desc: "One search bar, the entire internet. We aggregate data from company sites, job boards, and social media.",
              icon: Globe,
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-baby-100 hover:border-baby-300 hover:shadow-xl hover:shadow-baby-200/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-baby-50 flex items-center justify-center mb-6 text-baby-600">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-baby-600 to-baby-800 rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-baby-400/40">
           <div className="absolute top-0 right-0 w-64 h-64 bg-love-400/20 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-baby-300/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">Ready to launch?</h2>
            <p className="text-baby-100 text-lg mb-10 max-w-2xl mx-auto">
              Join the fastest growing community of ambitious students. Create your profile today and let the opportunities find you.
            </p>
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="px-12 py-5 bg-white text-baby-700 rounded-2xl font-bold text-lg hover:bg-baby-50 transition-all hover:scale-105 shadow-xl"
            >
              Start Free Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-baby-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-baby-400 p-1.5 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-baby-900">OpportunityHub</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-baby-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-baby-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-baby-600 transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="text-center text-baby-300 text-sm">
            &copy; {new Date().getFullYear()} OpportunityHub Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;