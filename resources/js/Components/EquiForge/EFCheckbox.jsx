/**
 * EquiForge Design System – Checkbox
 * Unchecked: square outline. Checked: filled primary with white checkmark.
 */
import React from 'react';

export default function EFCheckbox({ checked = false, onChange, disabled = false, label = 'Label', id, className = '', ...props }) {
  const uid = id || `ef-checkbox-${Math.random().toString(36).slice(2)}`;

  return (
    <label htmlFor={uid} className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
      <span className="relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center">
        <input
          id={uid}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={`
            h-5 w-5 rounded border-2 flex items-center justify-center transition-colors
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            ${checked ? 'border-primary-500 bg-primary-500' : 'border-black-300 bg-transparent'}
          `}
        >
          {checked && (
            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </span>
      {label && (
        <span className="text-ef-label font-ef-medium text-black-500 select-none">
          {label}
        </span>
      )}
    </label>
  );
}
