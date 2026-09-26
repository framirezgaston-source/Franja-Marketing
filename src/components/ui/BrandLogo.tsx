import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  light = false
}) => {
  const [imgError, setImgError] = useState(false);

  const imgSizeClass = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const titleClass = size === 'sm' ? 'text-sm font-semibold' : size === 'lg' ? 'text-xl font-bold' : 'text-base font-bold';
  const subtitleClass = size === 'sm' ? 'text-[9px]' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {!imgError ? (
        <img
          src="https://lh3.googleusercontent.com/aida/AEtjO1XpVn8v9YBdaRoEV6S8xESwTbF0EQuNrS8ANpNe71T-38z0XWCQbsg9Kw2Gulmb49QmUrw7XWuGU0XG3rw6OOKiXtVz7cOuObt1Fk7U3rne0Fp8LBF0HPTi-S3bngoPDrjCOxZtG8o2aAKFFIhNjCDrXpl5NLLG-eceBX8iFXtb5aAh0tG-AUL0ZZpAbsLek0t6miY3n1jY9gymc40ZPrlyfN7sy0Jd6nwnTCXCltpGIJE3C_L-31A3uJSfK9jkY-lf9_ze9zP9BAo"
          alt="Franja Automations"
          className={`${imgSizeClass} rounded-full object-contain shadow-xs`}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector fallback matching the 8-petal chrome metallic emblem */
        <div className={`${imgSizeClass} rounded-full bg-gradient-to-tr from-primary to-primary-container p-1 shadow-sm flex items-center justify-center shrink-0`}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="6">
            <ellipse cx="50" cy="30" rx="14" ry="24" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="50" cy="70" rx="14" ry="24" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="30" cy="50" rx="24" ry="14" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="70" cy="50" rx="24" ry="14" stroke="currentColor" strokeWidth="6" />
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="6" />
          </svg>
        </div>
      )}

      <div className="flex flex-col">
        <span className={`${titleClass} ${light ? 'text-white' : 'text-on-surface'} leading-none tracking-tight`}>
          Franja
        </span>
        {showSubtitle && (
          <span className={`${subtitleClass} ${light ? 'text-blue-100' : 'text-secondary'} font-semibold uppercase tracking-wider leading-tight mt-0.5`}>
            Marketing
          </span>
        )}
      </div>
    </div>
  );
};
