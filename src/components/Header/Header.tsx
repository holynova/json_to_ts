import React, { useState } from "react";

interface HeaderProps {
  currentKey?: string;
}

const TOOLS = [
  { key: "ts", label: "⚡ JS转TS", url: "https://holynova.github.io/json_to_ts/" },
  { key: "combination", label: "🔄 排列组合", url: "https://holynova.github.io/combination/" },
  { key: "json", label: "📝 JSON格式", url: "https://holynova.github.io/json-formatter/" },
  { key: "timer", label: "⏰ 火锅计时", url: "https://holynova.github.io/hotpot-timer/" },
  { key: "namer", label: "📚 古诗起名", url: "https://holynova.github.io/poet-namer/" },
  { key: "holiday", label: "📅 节假日", url: "https://holynova.github.io/holiday-visualizer/" },
  { key: "salary", label: "💰 倒推工资", url: "https://holynova.github.io/salary-calculator/" }
];

export const Header: React.FC<HeaderProps> = ({ currentKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="https://holynova.github.io/json_to_ts/"
              className="flex items-center text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>holynova.github.io</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {TOOLS.map((tool) => (
              <a
                key={tool.key}
                href={tool.url}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentKey === tool.key
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tool.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">打开菜单</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {TOOLS.map((tool) => (
            <a
              key={tool.key}
              href={tool.url}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                currentKey === tool.key
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tool.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
