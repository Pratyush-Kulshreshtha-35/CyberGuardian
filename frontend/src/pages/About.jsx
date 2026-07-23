const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        About Password Security
      </h1>
      
      <div className="space-y-8 text-slate-300 leading-relaxed text-lg">
        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">What is Password Entropy?</h2>
          <p className="mb-4">
            Password entropy is a measurement of how unpredictable a password is. It represents the number of guesses it would take an attacker to guess your password, often measured in bits. A higher entropy means a stronger password.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>&lt; 28 bits:</strong> Very Weak (Crackable in seconds)</li>
            <li><strong>28 - 35 bits:</strong> Weak (Crackable in hours)</li>
            <li><strong>36 - 59 bits:</strong> Reasonable (Crackable in months)</li>
            <li><strong>60 - 127 bits:</strong> Strong (Crackable in centuries)</li>
          </ul>
        </section>

        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">How Our Pattern Detection Works</h2>
          <p>
            Instead of just counting characters and requiring a mix of symbols and numbers, CyberGuardian uses advanced pattern matching (via zxcvbn). We look for:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-400">
            <li>Common dictionary words (English, common names, etc.)</li>
            <li>Spatial patterns on keyboards (e.g., "qwerty", "asdf")</li>
            <li>Repeated characters (e.g., "aaa")</li>
            <li>Common sequences (e.g., "12345", "abcdef")</li>
            <li>Personal context (your name, birthdate)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
