import { Link } from 'react-router-dom';
import { ShieldAlert, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm"
  >
    <div className="h-12 w-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative pt-20 pb-32">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                Uncompromising Security for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Life</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Analyze password strength in real-time, detect compromised credentials, and protect yourself against advanced brute-force and dictionary attacks.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                  Start Analyzing Now
                </Link>
                <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-lg transition-all border border-slate-700">
                  Learn How It Works
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Analysis</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our advanced pattern matching engine detects standard dictionary words, spatial keyboard sequences, and personal information leaks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldAlert}
              title="Breach Detection"
              description="Cross-references your passwords against billions of known breached credentials using k-Anonymity privacy protocols."
            />
            <FeatureCard 
              icon={Zap}
              title="Real-time Entropy"
              description="Calculates true password entropy and provides precise time-to-crack estimations based on modern hardware speeds."
            />
            <FeatureCard 
              icon={Lock}
              title="Contextual Awareness"
              description="Factors in your personal details (name, DOB) to ensure your passwords don't contain easily guessable personal info."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
