/**
 * EquiForge Design System – Radio button
 * Unchecked: circular outline. Checked: filled primary circle with darker primary dot.
 */
import React from 'react';

export default function EFRadio({ checked = false, onChange, disabled = false, name, value, label = 'Label', id, className = '', ...props }) {
  const uid = id || `ef-radio-${Math.random().toString(36).slice(2)}`;

  return (
    <label htmlFor={uid} className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
      <span className="relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center">
        <input
          id={uid}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={`
            h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            ${checked ? 'border-primary-500 bg-primary-500' : 'border-black-300 bg-transparent'}
          `}
        >
          {checked && <span className="h-2 w-2 rounded-full bg-primary-700" />}
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
