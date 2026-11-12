"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/shared/lib/cn";

type CloseCallback = () => void;
const tooltipRegistry = new Set<CloseCallback>();

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = React.useState(openProp ?? false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Register this tooltip's close function in the global registry
  const closeThis = React.useCallback(() => {
    setOpen(false);
    onOpenChangeProp?.(false);
  }, [onOpenChangeProp]);

  React.useEffect(() => {
    tooltipRegistry.add(closeThis);
    return () => {
      tooltipRegistry.delete(closeThis);
    };
  }, [closeThis]);

  // Close on outside click/touch (for touch devices)
  React.useEffect(() => {
    if (!isTouchDevice || !open) return;

    function handleOutsideClick(e: TouchEvent | MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
      onOpenChangeProp?.(false);
    }

    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isTouchDevice, open, onOpenChangeProp]);

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      if (isTouchDevice) {
        return;
      }
      setOpen(value);
      onOpenChangeProp?.(value);
    },
    [isTouchDevice, onOpenChangeProp],
  );

  const handleTriggerClick = React.useCallback(() => {
    if (isTouchDevice) {
      if (!open) {
        // Close all other tooltips first
        tooltipRegistry.forEach((closeFn) => {
          if (closeFn !== closeThis) closeFn();
        });
      }
      const next = !open;
      setOpen(next);
      onOpenChangeProp?.(next);
    }
  }, [isTouchDevice, open, onOpenChangeProp, closeThis]);

  // Sync controlled prop
  React.useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TooltipTrigger) {
            return React.cloneElement(
              child as React.ReactElement<{
                onClick?: React.MouseEventHandler;
                ref?: React.Ref<HTMLElement>;
              }>,
              {
                ref: triggerRef as React.Ref<HTMLElement>,
                onClick: (e: React.MouseEvent) => {
                  handleTriggerClick();
                  (
                    child as React.ReactElement<{
                      onClick?: React.MouseEventHandler;
                    }>
                  ).props.onClick?.(e);
                },
              },
            );
          }
          if (React.isValidElement(child) && child.type === TooltipContent) {
            return React.cloneElement(
              child as React.ReactElement<{ ref?: React.Ref<HTMLDivElement> }>,
              {
                ref: contentRef as React.Ref<HTMLDivElement>,
              },
            );
          }
          return child;
        })}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground -translate-x-4 lg:translate-x-0 text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-white translate-x-4 lg:translate-x-0 border-b-2 border-r-2 border-[rgba(120,18,20,0.24)] fill-white z-50 size-2.5 translate-y-[-50%] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
