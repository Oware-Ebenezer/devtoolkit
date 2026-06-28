import React, { useState } from 'react';
import { Copy, Check, AlertCircle, CheckCircle, RotateCcw, Sparkles, Minimize2, FileJson } from 'lucide-react';

const SAMPLE_JSON = `{
  "projectName": "DEVTOOLKIT PRO",
  "version": "1.0.0",
  "tagline": "Fast. Clean. Essential developer utilities.",
  "author": {
    "name": "Ebenezer Kwabena Oware",
    "email": "nanaprestige71@gmail.com"
  },
  "technologies": [
    "React",
    "Vite",
    "Tailwind CSS",
    "Lucide Icons"
  ],
  "features": {
    "formatter": true,
    "validator": true,
    "passwords": true,
    "textUtils": true
  },
  "isPremium": true
}`;

export default function JSONTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setIsValid(false);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError(err.message);
      setIsValid(false);
      setOutput('');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify.');
      setIsValid(false);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError(err.message);
      setIsValid(false);
      setOutput('');
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to validate.');
      setIsValid(false);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setError(null);
      setIsValid(true);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError(err.message);
      setIsValid(false);
      setOutput('');
    }
  };

  const handleCopy = async () => {
    const textToCopy = output || input;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setIsValid(null);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    setError(null);
    setIsValid(null);
    setOutput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Info Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            <FileJson className="w-5 h-5 text-brand-accent" />
            JSON Formatter & Validator
          </h3>
          <p className="text-sm text-brand-accent mt-1">
            Validate, pretty-print, and compress your JSON data with instant error feedback.
          </p>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleLoadSample}
            className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-md border border-brand-accent/20 text-brand-dark/70 hover:bg-brand-accent/10 transition-colors cursor-pointer"
          >
            Load Sample
          </button>
          <button
            onClick={handleClear}
            className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-md border border-red-500/20 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Main Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="json-input" className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Raw JSON Input
            </label>
            <span className="text-xs text-brand-dark/40 font-mono">
              Characters: {input.length}
            </span>
          </div>
          <div className="relative flex-1">
            <textarea
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type raw JSON here..."
              className="w-full h-80 lg:h-96 p-4 rounded-xl font-mono text-sm glass-input resize-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="json-output" className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              Result / Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-brand-dark bg-brand-gold/10 hover:bg-brand-gold/20 px-2.5 py-1 rounded transition-all duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Output
                  </>
                )}
              </button>
            )}
          </div>
          <div className="relative flex-1">
            <textarea
              id="json-output"
              readOnly
              value={output}
              placeholder="Formatted output will appear here..."
              className="w-full h-80 lg:h-96 p-4 rounded-xl font-mono text-sm bg-brand-dark/5 border border-brand-accent/20 text-brand-dark/95 resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Status & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pt-2">
        {/* Status Messages */}
        <div className="flex-1">
          {isValid === true && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span><span className="font-bold">Valid JSON!</span> Ready to be copied or minified.</span>
            </div>
          )}
          {isValid === false && error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Invalid JSON</span>
                <span className="font-mono text-xs opacity-90">{error}</span>
              </div>
            </div>
          )}
          {isValid === null && (
            <div className="text-xs text-brand-dark/50 italic py-2">
              Tip: Paste your JSON above, then click 'Format & Validate' to check syntax.
            </div>
          )}
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleValidate}
            className="flex-1 md:flex-initial px-5 py-2.5 rounded-lg border-2 border-brand-accent/30 text-brand-dark font-medium hover:bg-brand-accent/5 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Validate Syntax
          </button>
          <button
            onClick={handleMinify}
            className="flex-1 md:flex-initial px-5 py-2.5 rounded-lg border-2 border-brand-accent/30 text-brand-dark font-medium hover:bg-brand-accent/5 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Minimize2 className="w-4 h-4" />
            Minify JSON
          </button>
          <button
            onClick={handleFormat}
            className="flex-1 md:flex-initial px-6 py-2.5 bg-brand-gold hover:bg-[#B5965E] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Format & Validate
          </button>
        </div>
      </div>
    </div>
  );
}
