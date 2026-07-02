import React, { cloneElement } from 'react';

const baseStyles = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white';

const variants = {
  default: 'bg-black text-white hover:bg-zinc-800 shadow-sm',
  outline: 'border border-black bg-white text-black hover:bg-zinc-100',
  accent: 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-sm'
};

export function Button({ children, className = '', variant = 'default', asChild = false, ...props }) {
  const classes = `${baseStyles} ${variants[variant] || variants.default} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`,
      ...props
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
