/**
 * EquiForge Design System – Button
 * Variants: solid primary (dark purple), solid secondary (teal), outlined, muted (low emphasis).
 * Sizes: default (text + optional arrows), icon (square icon-only).
 */
import React from 'react';

const ArrowLeft = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const ArrowUp = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);
const IconHouse = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const variantStyles = {
  solidPrimary: 'bg-primary-600 text-white hover:bg-primary-700 border border-primary-600',
  solidPrimaryLight: 'bg-primary-400 text-white hover:bg-primary-500 border border-primary-400',
  solidSecondary: 'bg-secondary-500 text-white hover:bg-secondary-600 border border-secondary-500',
  solidSecondaryLight: 'bg-secondary-400 text-white hover:bg-secondary-500 border border-secondary-400',
  outline: 'bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-100',
  outlineMuted: 'bg-transparent text-black-300 border border-black-200 hover:bg-black-100 text-black-300',
};

const sizeStyles = {
  default: 'h-9 min-w-[7rem] px-4 gap-2 rounded-md text-ef-label font-ef-medium',
  icon: 'h-9 w-9 p-0 rounded-md inline-flex items-center justify-center',
};

export default function EFButton({
  children = 'Button',
  variant = 'solidPrimary',
  size = 'default',
  showArrows = true,
  icon = 'arrowUp',
  className = '',
  disabled = false,
  ...props
}) {
  const isIconOnly = size === 'icon';
  const base = 'inline-flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClass = disabled && variant === 'outline' ? variantStyles.outlineMuted : variantStyles[variant];
  const sizeClass = sizeStyles[size];

  const Icon = icon === 'house' ? IconHouse : ArrowUp;

  return (
    <button
      type="button"
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {isIconOnly ? (
        <Icon />
      ) : (
        <>
          {showArrows && <ArrowLeft />}
          <span>{children}</span>
          {showArrows && <ArrowRight />}
        </>
      )}
    </button>
  );
}

export { ArrowLeft, ArrowRight, ArrowUp, IconHouse };
