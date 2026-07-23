import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Eye, EyeOff, AlertTriangle, ShieldCheck, KeyRound, Clock, AlertOctagon, Lightbulb, RefreshCw } from 'lucide-react';

const Analyzer = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ name: '', dob: '' });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debounce function
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedPassword = useDebounce(password, 500);
  const debouncedUserData = useDebounce(userData, 500);

  useEffect(() => {
    const analyzePassword = async () => {
      if (!debouncedPassword) {
        setAnalysis(null);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.post(`${API_URL}/api/analyze/check-password`, {
          password: debouncedPassword,
          userData: debouncedUserData
        });
        setAnalysis(res.data);
      } catch (err) {
        setError('Failed to analyze password. Ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    analyzePassword();
  }, [debouncedPassword, debouncedUserData]);

  const getScoreColor = (score) => {
    switch(score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-emerald-400';
      case 4: return 'bg-emerald-500';
      default: return 'bg-slate-700';
    }
  };

  const getScoreLabel = (score) => {
    switch(score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return 'Enter Password';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-emerald-400 h-8 w-8" />
            Security Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Real-time threat analysis and entropy calculation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-emerald-400" />
              Analyze Password
            </h2>
            
            <div className="relative mb-6">
              <input
                aria-label="Password to analyze"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to analyze..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-4 text-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400">Contextual Verification (Optional)</h3>
              <p className="text-xs text-slate-500 mb-2">Adding these helps detect if your password contains easily guessable personal info.</p>
              
              <input
                aria-label="Your Name"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                placeholder="Your Name (e.g., John Doe)"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-slate-500 transition-all"
              />
              <input
                aria-label="Date of Birth or Year"
                type="text"
                value={userData.dob}
                onChange={(e) => setUserData({...userData, dob: e.target.value})}
                placeholder="Date of Birth / Year (e.g., 1990)"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-slate-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {!password ? (
            <div className="h-full bg-slate-800/30 border border-slate-700/50 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-slate-500 min-h-[400px]">
              <ShieldCheck className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">Waiting for input to begin analysis...</p>
            </div>
          ) : loading && !analysis ? (
            <div className="h-full bg-slate-800/50 rounded-2xl flex flex-col items-center justify-center p-12 text-slate-400 min-h-[400px] border border-slate-700">
              <RefreshCw className="h-8 w-8 animate-spin mb-4 text-emerald-500" />
              <p>Analyzing entropy and checking breach databases...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Score Header */}
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Strength Score</p>
                    <h2 className="text-3xl font-bold text-white">{getScoreLabel(analysis.score)}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 mb-1">Estimated Crack Time</p>
                    <p className="text-xl font-mono text-emerald-400">{analysis.crackTime}</p>
                  </div>
                </div>

                <div className="flex gap-1 h-2 w-full mt-4 rounded-full overflow-hidden bg-slate-900">
                  {[0, 1, 2, 3].map((idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 ${analysis.score >= idx + 1 ? getScoreColor(analysis.score) : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Advanced Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertOctagon className="h-5 w-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-white">Breach Detection</h3>
                  </div>
                  {analysis.breachCount > 0 ? (
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold text-xl mb-1">{analysis.breachCount.toLocaleString()} Leaks</p>
                      <p className="text-sm text-red-300">This exact password has appeared in known data breaches. Do not use it.</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-emerald-400 font-bold text-lg mb-1">Zero Leaks Detected</p>
                      <p className="text-sm text-emerald-300/80">This password does not appear in the HaveIBeenPwned database.</p>
                    </div>
                  )}
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Entropy Stats</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-400 flex justify-between">
                        <span>Raw Entropy</span>
                        <span className="font-mono text-cyan-400">~{(analysis.entropy * 3.32).toFixed(1)} bits</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 flex justify-between">
                        <span>Guesses to Crack</span>
                        <span className="font-mono text-cyan-400">10^{analysis.entropy.toFixed(1)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback & Suggestions */}
              {((analysis.feedback && (analysis.feedback.warning || analysis.feedback.suggestions?.length > 0)) || analysis.patternMatches?.length > 0) && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    Analysis Insights
                  </h3>
                  
                  {analysis.feedback?.warning && (
                    <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 flex gap-3 text-orange-400">
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                      <p className="text-sm">{analysis.feedback.warning}</p>
                    </div>
                  )}

                  {analysis.patternMatches?.some(p => p.pattern === 'dictionary' || p.pattern === 'spatial') && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-300 mb-2">Detected Patterns:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.patternMatches.map((match, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                            {match.token} <span className="text-slate-500">({match.pattern})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.feedback?.suggestions?.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-400">
                      {analysis.feedback.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Stronger Alternatives */}
              {analysis.score < 4 && analysis.suggestedAlternatives?.length > 0 && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-emerald-500/30">
                  <h3 className="text-lg font-semibold text-white mb-3 text-emerald-400">Try these stronger alternatives:</h3>
                  <div className="flex flex-wrap gap-3">
                    {analysis.suggestedAlternatives.map((alt, idx) => (
                      <div key={idx} className="bg-slate-900 px-4 py-2 rounded-lg font-mono text-sm border border-slate-700 text-slate-300 select-all cursor-pointer hover:border-emerald-500 hover:text-white transition-colors">
                        {alt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
             <div className="h-full bg-slate-800/50 border border-red-500/50 rounded-2xl flex flex-col items-center justify-center p-12 text-red-400 min-h-[400px]">
              <AlertTriangle className="h-12 w-12 mb-4" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
