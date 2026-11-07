import React from 'react';
import { Butterfly } from '../types';

interface ButterflyRendererProps {
  butterfly: Butterfly;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isFluttering?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ButterflyRenderer: React.FC<ButterflyRendererProps> = ({
  butterfly,
  size = 'md',
  isFluttering = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-64 h-64',
  };

  const { wingsColor, pattern } = butterfly;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform active:scale-95 ${sizeMap[size]} ${className}`}
      style={{
        filter: `drop-shadow(0 6px 14px ${wingsColor.glow})`,
      }}
      title={butterfly.name}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full overflow-visible ${isFluttering ? 'animate-wing-flutter' : ''}`}
      >
        <defs>
          {/* Main Wing Gradients */}
          <linearGradient id={`wing-grad-${butterfly.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={wingsColor.primary} />
            <stop offset="60%" stopColor={wingsColor.secondary} />
            <stop offset="100%" stopColor={wingsColor.accent} />
          </linearGradient>

          <radialGradient id={`wing-radial-${butterfly.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor={wingsColor.primary} stopOpacity="0.9" />
            <stop offset="100%" stopColor={wingsColor.secondary} />
          </radialGradient>

          {/* Rainbow Special Gradient */}
          <linearGradient id="rainbow-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4B4B" />
            <stop offset="20%" stopColor="#FFA100" />
            <stop offset="40%" stopColor="#FFE600" />
            <stop offset="60%" stopColor="#1DD1A1" />
            <stop offset="80%" stopColor="#2E86DE" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>

          {/* Aurora Glow */}
          <linearGradient id="aurora-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* LEFT UPPER WING */}
        <path
          d="M 100 100 C 60 40, 20 20, 10 50 C 0 80, 25 125, 100 100 Z"
          fill={pattern === 'rainbow' ? 'url(#rainbow-wing)' : pattern === 'aurora' ? 'url(#aurora-wing)' : `url(#wing-grad-${butterfly.id})`}
          stroke={wingsColor.accent}
          strokeWidth="2.5"
        />

        {/* RIGHT UPPER WING */}
        <path
          d="M 100 100 C 140 40, 180 20, 190 50 C 200 80, 175 125, 100 100 Z"
          fill={pattern === 'rainbow' ? 'url(#rainbow-wing)' : pattern === 'aurora' ? 'url(#aurora-wing)' : `url(#wing-grad-${butterfly.id})`}
          stroke={wingsColor.accent}
          strokeWidth="2.5"
        />

        {/* LEFT LOWER WING */}
        <path
          d="M 100 105 C 65 115, 30 135, 40 170 C 50 190, 85 180, 100 115 Z"
          fill={pattern === 'rainbow' ? 'url(#rainbow-wing)' : pattern === 'aurora' ? 'url(#aurora-wing)' : `url(#wing-grad-${butterfly.id})`}
          stroke={wingsColor.accent}
          strokeWidth="2"
        />

        {/* RIGHT LOWER WING */}
        <path
          d="M 100 105 C 135 115, 170 135, 160 170 C 150 190, 115 180, 100 115 Z"
          fill={pattern === 'rainbow' ? 'url(#rainbow-wing)' : pattern === 'aurora' ? 'url(#aurora-wing)' : `url(#wing-grad-${butterfly.id})`}
          stroke={wingsColor.accent}
          strokeWidth="2"
        />

        {/* PATTERN ORNAMENTS */}
        {pattern === 'tiger' && (
          <g stroke="#18181B" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <path d="M 40 50 Q 60 70 85 90" />
            <path d="M 30 75 Q 55 90 85 98" />
            <path d="M 160 50 Q 140 70 115 90" />
            <path d="M 170 75 Q 145 90 115 98" />
            <circle cx="55" cy="165" r="4" fill="#3B82F6" stroke="none" />
            <circle cx="145" cy="165" r="4" fill="#3B82F6" stroke="none" />
          </g>
        )}

        {pattern === 'dots' && (
          <g fill="#FFFFFF" opacity="0.9">
            <circle cx="50" cy="65" r="7" />
            <circle cx="70" cy="50" r="5" />
            <circle cx="150" cy="65" r="7" />
            <circle cx="130" cy="50" r="5" />
            <circle cx="60" cy="155" r="5" />
            <circle cx="140" cy="155" r="5" />
          </g>
        )}

        {pattern === 'stars' && (
          <g fill="#FFFBEB" opacity="0.95">
            <polygon points="50,55 53,63 61,63 55,68 57,76 50,71 43,76 45,68 39,63 47,63" />
            <polygon points="150,55 153,63 161,63 155,68 157,76 150,71 143,76 145,68 139,63 147,63" />
            <circle cx="65" cy="150" r="3.5" />
            <circle cx="135" cy="150" r="3.5" />
          </g>
        )}

        {pattern === 'blossom' && (
          <g fill="#FFF1F2" opacity="0.9">
            <circle cx="50" cy="65" r="6" />
            <circle cx="45" cy="60" r="5" />
            <circle cx="55" cy="60" r="5" />
            <circle cx="150" cy="65" r="6" />
            <circle cx="145" cy="60" r="5" />
            <circle cx="155" cy="60" r="5" />
            <circle cx="60" cy="155" r="4" />
            <circle cx="140" cy="155" r="4" />
          </g>
        )}

        {pattern === 'swallow' && (
          <g stroke="#06B6D4" strokeWidth="2.5" fill="none">
            <path d="M 40 170 Q 30 190 25 198" />
            <path d="M 160 170 Q 170 190 175 198" />
            <circle cx="55" cy="160" r="4" fill="#F43F5E" stroke="none" />
            <circle cx="145" cy="160" r="4" fill="#F43F5E" stroke="none" />
          </g>
        )}

        {/* BUTTERFLY BODY */}
        {/* Antennae */}
        <path
          d="M 97 70 Q 80 40 65 42"
          stroke="#44403C"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="64" cy="42" r="3.5" fill="#44403C" />

        <path
          d="M 103 70 Q 120 40 135 42"
          stroke="#44403C"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="136" cy="42" r="3.5" fill="#44403C" />

        {/* Head */}
        <circle cx="100" cy="74" r="7.5" fill="#292524" />
        {/* Cute cute big eyes for preschoolers */}
        <circle cx="97" cy="73" r="2.2" fill="#FFFFFF" />
        <circle cx="97" cy="73" r="1.1" fill="#000000" />
        <circle cx="103" cy="73" r="2.2" fill="#FFFFFF" />
        <circle cx="103" cy="73" r="1.1" fill="#000000" />

        {/* Thorax and Abdomen */}
        <ellipse cx="100" cy="95" rx="5.5" ry="14" fill="#292524" />
        <ellipse cx="100" cy="125" rx="4.5" ry="18" fill="#44403C" />

        {/* Abdomen segments */}
        <line x1="96" y1="116" x2="104" y2="116" stroke="#78716C" strokeWidth="1.5" />
        <line x1="96" y1="123" x2="104" y2="123" stroke="#78716C" strokeWidth="1.5" />
        <line x1="96" y1="130" x2="104" y2="130" stroke="#78716C" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
