import React from 'react';

export default function RouteLoader({ icon: Icon, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50/95 via-orange-50/90 to-slate-50/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 backdrop-blur-md transition-all duration-500 animate-loader-fade-in">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-transparent border-t-orange-400 dark:border-t-orange-500 rounded-full animate-spin-fast" />
        </div>

        {/* Middle pulsing ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 border-4 border-orange-300/30 dark:border-orange-400/20 rounded-full animate-pulse-slow" />
        </div>

        {/* Inner glow rings */}
        <div className="absolute inset-0 flex items-center justify-center animate-ping-slow">
          <div className="w-24 h-24 bg-orange-400/10 dark:bg-orange-500/10 rounded-full" />
        </div>

        {/* Center icon container with gradient */}
        <div className="relative z-10 bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-2xl border-2 border-orange-200/50 dark:border-orange-500/20">
          {/* Icon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent rounded-2xl animate-pulse-glow" />
          
          {Icon && (
            <Icon 
              size={56} 
              className="relative z-10 text-orange-600 dark:text-orange-400 animate-icon-bounce drop-shadow-lg" 
              strokeWidth={1.8}
            />
          )}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/40 dark:bg-orange-500/30 rounded-full animate-float-particle"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
              Loading
            </span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-orange-500 dark:bg-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loader-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }

        @keyframes ping-slow {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-5deg); }
          75% { transform: translateY(-4px) rotate(5deg); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0;
          }
          25% { 
            opacity: 0.6;
          }
          50% { 
            transform: translate(var(--float-x, 20px), var(--float-y, -30px)) scale(1.2); 
            opacity: 0.8;
          }
          75% { 
            opacity: 0.4;
          }
        }

        .animate-loader-fade-in {
          animation: loader-fade-in 0.3s ease-out;
        }

        .animate-spin-fast {
          animation: spin-fast 1.5s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-icon-bounce {
          animation: icon-bounce 2s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}