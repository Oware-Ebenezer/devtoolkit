import React, { useState } from 'react';
import { Braces, KeyRound, TextQuote, Cpu } from 'lucide-react';
import JSONTool from './components/JSONTool';
import PasswordTool from './components/PasswordTool';
import TextTool from './components/TextTool';

export default function App() {
  const [activeTab, setActiveTab] = useState('json');

  const tabs = [
    {
      id: 'json',
      label: 'JSON Formatter',
      icon: Braces,
      component: JSONTool,
    },
    {
      id: 'password',
      label: 'Password Generator',
      icon: KeyRound,
      component: PasswordTool,
    },
    {
      id: 'text',
      label: 'Text Utilities',
      icon: TextQuote,
      component: TextTool,
    },
  ];

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component || JSONTool;

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 md:px-8">
      {/* Decorative top ambient glow (premium visual detail) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-60 bg-gradient-to-b from-[#547A95]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center space-y-8 z-10">
        
        {/* Hero Section */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3947]/5 border border-[#547A95]/15">
            <Cpu className="w-4 h-4 text-[#547A95]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#547A95]">
              Developer Suite
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2C3947]">
            DEVTOOLKIT <span className="text-[#C2A56D]">PRO</span>
          </h1>
          <p className="text-base md:text-lg text-[#547A95] font-medium max-w-md mx-auto">
            Fast. Clean. Essential developer utilities.
          </p>
        </header>

        {/* Utilities Dashboard */}
        <main className="glass-panel rounded-3xl overflow-hidden border border-[#547A95]/20 shadow-xl flex flex-col">
          {/* Tab Navigation */}
          <nav className="flex flex-wrap border-b border-[#547A95]/15 bg-[#2C3947]/5 p-2 gap-1" aria-label="Tool tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={isActive}
                  role="tab"
                  className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2C3947] text-white shadow-md border border-[#547A95]/30'
                      : 'text-[#2C3947]/75 hover:bg-[#2C3947]/10 hover:text-[#2C3947]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C2A56D]' : 'text-[#547A95]'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Active Utility Panel */}
          <div className="p-6 md:p-8 bg-white/50 backdrop-blur-md">
            <ActiveComponent />
          </div>
        </main>
      </div>

      {/* Professional Footer */}
      <footer className="w-full max-w-5xl mx-auto mt-12 pt-6 border-t border-[#547A95]/15 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm z-10 text-[#547A95]">
        <div className="space-y-1">
          <p className="font-semibold text-[#2C3947]">
            DEVTOOLKIT PRO &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs">
            Designed and developed by <span className="font-semibold text-[#2C3947]">Ebenezer Kwabena Oware</span>
          </p>
          <p className="text-xs font-mono">
            Contact: <a href="mailto:nanaprestige71@gmail.com" className="hover:text-[#C2A56D] underline">nanaprestige71@gmail.com</a>
          </p>
        </div>

        <div>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-[#2C3947] text-white hover:text-[#C2A56D] border border-[#547A95]/30 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Built for Digital Heroes
          </a>
        </div>
      </footer>
    </div>
  );
}
