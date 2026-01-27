import { describe, it, expect } from 'vitest';
import { cn } from '@utils/classNames';

describe('cn utility', () => {
  it('merges class names', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('removes falsy values', () => {
    const result = cn('base', false, null, undefined, 'valid');
    expect(result).toBe('base valid');
  });

  it('merges tailwind classes correctly', () => {
    // twMerge handles conflicting tailwind classes
    const result = cn('px-4 py-2', 'px-8');
    expect(result).toBe('py-2 px-8');
  });

  it('handles array inputs', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });
});
