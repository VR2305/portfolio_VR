import React, { PropsWithChildren, ReactNode } from 'react';
import { SPACING } from '@/constants/spacing';

/**
 * Reusable layout wrapper for each page section.
 * Applies a consistent vertical padding based on the design system and
 * accepts optional id for anchor navigation.
 */
interface SectionWrapperProps extends PropsWithChildren {
  /** Unique id for the section – used for navigation anchors */
  id?: string;
  /** Optional additional class names */
  className?: string;
  /** Optional heading element for accessibility – renders <h2> when provided */
  heading?: ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  className = '',
  heading,
  children,
}) => {
  const basePadding = `py-${SPACING.xl}`; // vertical rhythm

  return (
    <section id={id} className={`relative w-full ${basePadding} ${className}`}>
      {heading && (
        <h2 className="sr-only" aria-hidden="true">
          {heading}
        </h2>
      )}
      {children}
    </section>
  );
};
