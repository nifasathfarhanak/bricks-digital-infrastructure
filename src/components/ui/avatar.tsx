// ─── Avatar (Radix UI wrapper) ────────────────────────────────────────────────
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import React from 'react';

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className = '', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={['relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className].join(' ')}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className = '', ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={['aspect-square h-full w-full object-cover', className].join(' ')}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className = '', ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={[
      'flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-700 font-semibold text-sm',
      className,
    ].join(' ')}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
