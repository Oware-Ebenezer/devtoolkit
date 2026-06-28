import React, { useState } from 'react';
import { Copy, Check, Type, RotateCcw, Clock, FileText, Hash } from 'lucide-react';

export default function TextTool() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleClear = () => {
    setText('');
  };

  // Transformations
  const toUppercase = () => {
    setText(text.toUpperCase());
  };

  const toLowercase = () => {
    setText(text.toLowerCase());
  };

  const toTitleCase = () => {
    const titleCased = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(titleCased);
  };

  const toSentenceCase = () => {
    if (!text) return;
    // Lowercase everything and capitalize the first letter of each sentence
    const sentenceCased = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase());
    setText(sentenceCased);
  };

  // Metrics calculation
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  
  // Clean word split
  const cleanWords = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = cleanWords.length;

  // Reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            <Type className="w-5 h-5 text-brand-accent" />
            Text Utilities
          </h3>
          <p className="text-sm text-brand-accent mt-1">
            Analyze text metrics, adjust casing formats, and estimate reading time.
          </p>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {text && (
            <>
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-md border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-md border border-red-500/20 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Character Count */}
        <div className="bg-white/40 border border-brand-accent/10 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-brand-accent/10 rounded-lg text-brand-accent">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider block">Characters</span>
            <span className="text-xl font-extrabold text-brand-dark font-mono block mt-0.5">{charCount}</span>
            <span className="text-[10px] text-brand-dark/50 font-medium">({charCountNoSpaces} no spaces)</span>
          </div>
        </div>

        {/* Metric 2: Word Count */}
        <div className="bg-white/40 border border-brand-accent/10 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-brand-accent/10 rounded-lg text-brand-accent">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider block">Words</span>
            <span className="text-xl font-extrabold text-brand-dark font-mono block mt-0.5">{wordCount}</span>
            <span className="text-[10px] text-brand-dark/50 font-medium">separated by spaces</span>
          </div>
        </div>

        {/* Metric 3: Reading Time */}
        <div className="bg-white/40 border border-brand-accent/10 rounded-xl p-4 flex items-center gap-3 col-span-2 lg:col-span-2">
          <div className="p-2.5 bg-brand-accent/10 rounded-lg text-brand-accent">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider block">Est. Reading Time</span>
            <span className="text-xl font-extrabold text-brand-dark font-mono block mt-0.5">
              {readingTime} {readingTime === 1 ? 'min' : 'mins'}
            </span>
            <span className="text-[10px] text-brand-dark/50 font-medium">based on 200 WPM speed</span>
          </div>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            Enter Your Text
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your content here to begin analyzing..."
            className="w-full h-64 p-4 rounded-xl font-sans text-base glass-input resize-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
          />
        </div>

        {/* Transformation Controls */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            onClick={toUppercase}
            disabled={!text}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold tracking-wide uppercase border border-brand-accent/20 rounded-lg text-brand-dark/80 hover:bg-brand-accent/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            UPPERCASE
          </button>
          <button
            onClick={toLowercase}
            disabled={!text}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold tracking-wide uppercase border border-brand-accent/20 rounded-lg text-brand-dark/80 hover:bg-brand-accent/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            lowercase
          </button>
          <button
            onClick={toTitleCase}
            disabled={!text}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold tracking-wide uppercase border border-brand-accent/20 rounded-lg text-brand-dark/80 hover:bg-brand-accent/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            Title Case
          </button>
          <button
            onClick={toSentenceCase}
            disabled={!text}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold tracking-wide uppercase border border-brand-accent/20 rounded-lg text-brand-dark/80 hover:bg-brand-accent/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            Sentence case
          </button>
        </div>
      </div>
    </div>
  );
}
