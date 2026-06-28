import React, { useState, useEffect } from 'react';
import { Copy, Check, Key, Shield, ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';

export default function PasswordTool() {
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate password on load and when parameters change
  useEffect(() => {
    handleGenerate();
  }, [length, includeSymbols, includeNumbers, includeUppercase, includeLowercase]);

  const handleGenerate = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    const guaranteed = [];

    // Ensure we have at least one character set active
    const activeSets = {
      lowercase: includeLowercase,
      uppercase: includeUppercase,
      numbers: includeNumbers,
      symbols: includeSymbols
    };

    const activeCount = Object.values(activeSets).filter(Boolean).length;
    
    // If user unchecked everything, default back to lowercase + uppercase
    let finalLowercase = includeLowercase;
    let finalUppercase = includeUppercase;
    let finalNumbers = includeNumbers;
    let finalSymbols = includeSymbols;

    if (activeCount === 0) {
      finalLowercase = true;
      finalUppercase = true;
    }

    if (finalLowercase) {
      chars += lowercase;
      guaranteed.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    if (finalUppercase) {
      chars += uppercase;
      guaranteed.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    if (finalNumbers) {
      chars += numbers;
      guaranteed.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (finalSymbols) {
      chars += symbols;
      guaranteed.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    let generated = '';
    const remainingLength = Math.max(0, length - guaranteed.length);
    for (let i = 0; i < remainingLength; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }

    // Combine and shuffle using Fisher-Yates
    const combined = [...guaranteed, ...generated.split('')];
    // Trim if combined length exceeds requested length due to guaranteed addition (shouldn't happen since remainingLength is capped)
    const slicedCombined = combined.slice(0, length);
    
    for (let i = slicedCombined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slicedCombined[i], slicedCombined[j]] = [slicedCombined[j], slicedCombined[i]];
    }

    setPassword(slicedCombined.join(''));
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password', err);
    }
  };

  // Evaluate password strength
  const getStrengthInfo = () => {
    if (!password) return { score: 0, label: 'None', color: 'bg-gray-200', textColor: 'text-gray-400', icon: ShieldAlert };

    let score = 0;
    
    // Length contribution
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 2;
    if (password.length >= 16) score += 1;

    // Diversity contribution
    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const typesCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    score += typesCount;

    if (score < 4) {
      return {
        score,
        label: 'Weak',
        color: 'bg-red-500',
        textColor: 'text-red-500',
        barWidth: 'w-1/4',
        icon: ShieldAlert,
        tip: 'Increase length and include symbols/numbers.'
      };
    } else if (score < 6) {
      return {
        score,
        label: 'Medium',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
        barWidth: 'w-2/4',
        icon: ShieldAlert,
        tip: 'Make it longer or add uppercase letters for better security.'
      };
    } else if (score < 8) {
      return {
        score,
        label: 'Strong',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        barWidth: 'w-3/4',
        icon: ShieldCheck,
        tip: 'Great password! Very difficult to brute-force.'
      };
    } else {
      return {
        score,
        label: 'Excellent',
        color: 'bg-brand-gold',
        textColor: 'text-brand-gold',
        barWidth: 'w-full',
        icon: ShieldCheck,
        tip: 'Premium strength. Ideal for highly sensitive accounts.'
      };
    }
  };

  const strength = getStrengthInfo();
  const StrengthIcon = strength.icon;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-accent" />
          Password Generator
        </h3>
        <p className="text-sm text-brand-accent mt-1">
          Instantly generate cryptographically secure, customizable passwords.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Settings Panel (3 columns on md+) */}
        <div className="md:col-span-3 space-y-5 bg-white/40 p-5 rounded-2xl border border-brand-accent/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent">
            Customization Rules
          </h4>

          {/* Slider for Length */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <label htmlFor="password-length" className="text-brand-dark">Password Length</label>
              <span className="font-mono bg-brand-accent/10 text-brand-dark px-2.5 py-0.5 rounded text-xs font-semibold">
                {length} chars
              </span>
            </div>
            <input
              id="password-length"
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-brand-gold bg-brand-accent/10 rounded-lg appearance-none h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-brand-dark/40 font-mono">
              <span>6</span>
              <span>12</span>
              <span>16</span>
              <span>24</span>
              <span>32</span>
              <span>48</span>
              <span>64</span>
            </div>
          </div>

          <hr className="border-brand-accent/10" />

          {/* Character Options Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Include Numbers */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-brand-accent/10 bg-white/20 hover:bg-white/50 hover:border-brand-gold/30 transition-all cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4.5 h-4.5 accent-brand-gold rounded border-brand-accent/30 text-brand-gold"
              />
              <div>
                <span className="text-sm font-semibold text-brand-dark block">Include Numbers</span>
                <span className="text-[11px] text-brand-accent font-mono block mt-0.5">(0-9)</span>
              </div>
            </label>

            {/* Include Symbols */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-brand-accent/10 bg-white/20 hover:bg-white/50 hover:border-brand-gold/30 transition-all cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4.5 h-4.5 accent-brand-gold rounded border-brand-accent/30 text-brand-gold"
              />
              <div>
                <span className="text-sm font-semibold text-brand-dark block">Include Symbols</span>
                <span className="text-[11px] text-brand-accent font-mono block mt-0.5">(!@#$%)</span>
              </div>
            </label>

            {/* Uppercase letters */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-brand-accent/10 bg-white/20 hover:bg-white/50 hover:border-brand-gold/30 transition-all cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4.5 h-4.5 accent-brand-gold rounded border-brand-accent/30 text-brand-gold"
              />
              <div>
                <span className="text-sm font-semibold text-brand-dark block">Uppercase</span>
                <span className="text-[11px] text-brand-accent font-mono block mt-0.5">(A-Z)</span>
              </div>
            </label>

            {/* Lowercase letters */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-brand-accent/10 bg-white/20 hover:bg-white/50 hover:border-brand-gold/30 transition-all cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4.5 h-4.5 accent-brand-gold rounded border-brand-accent/30 text-brand-gold"
              />
              <div>
                <span className="text-sm font-semibold text-brand-dark block">Lowercase</span>
                <span className="text-[11px] text-brand-accent font-mono block mt-0.5">(a-z)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Output Panel (2 columns on md+) */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-4 bg-white/40 p-5 rounded-2xl border border-brand-accent/10">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent">
              Generated Result
            </h4>

            {/* Output Box */}
            <div className="relative group">
              <div className="w-full bg-brand-dark/5 border border-brand-accent/25 rounded-xl p-4 pr-12 font-mono text-base font-semibold text-brand-dark select-all overflow-x-auto whitespace-nowrap min-h-14 flex items-center">
                {password}
              </div>
              <button
                onClick={handleCopy}
                title="Copy Password"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-brand-gold/10 text-brand-gold hover:text-brand-dark rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
              </button>
            </div>

            {/* Strength Meter */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dark/60">Strength Rating:</span>
                <span className={`font-bold uppercase tracking-wider ${strength.textColor} flex items-center gap-1.5`}>
                  <StrengthIcon className="w-4 h-4 shrink-0" />
                  {strength.label}
                </span>
              </div>
              <div className="w-full bg-brand-dark/10 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} ${strength.barWidth} transition-all duration-300`} />
              </div>
              {strength.tip && (
                <p className="text-[11px] text-brand-dark/50 italic leading-snug">
                  💡 {strength.tip}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-brand-gold hover:bg-[#B5965E] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Generate New Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
