/**
 * EquiForge Design System – Toggle (switch)
 * Off: grey track + light grey handle. On: primary purple track + darker purple handle.
 */
import React from 'react';

export default function EFToggle({ checked = false, onChange, disabled = false, className = '', ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 rounded-full border-0 transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${checked ? 'bg-primary-500' : 'bg-black-200'}
        ${className}
      `}
      {...props}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition
          ${checked ? 'translate-x-6 bg-primary-600' : 'translate-x-0.5 bg-black-100'}
        `}
      />
    </button>
  );
}
