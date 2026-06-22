import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

/**
 * Simple reusable button component.
 * Uses Tailwind utility classes that reference the design tokens defined in `theme.ts`.
 * Includes focus-visible ring, hover state, and optional ARIA label for icon‑only buttons.
 */
interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /** Optional variant – for now we expose only the primary cyan style */
  variant?: 'primary' | 'secondary';
  /** Optional size – small or default */
  size?: 'sm' | 'md';
  /** ARIA label for buttons that contain only an icon */
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ariaLabel,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2';

  const variantClasses =
    variant === 'primary'
      ? 'bg-cyan-400 text-black hover:bg-cyan-500 focus-visible:ring-cyan-400'
      : 'bg-gray-700 text-white hover:bg-gray-600 focus-visible:ring-gray-400';

  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base';

  return (
    <button
      aria-label={ariaLabel}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
