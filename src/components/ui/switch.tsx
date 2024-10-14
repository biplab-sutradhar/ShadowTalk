import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    onCheckedChange?: (checked: boolean) => void; // Add this line
  }
>(({ className, onCheckedChange, ...props }, ref) => (
  <SwitchPrimitives.Root
<<<<<<< HEAD
  className={cn(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-green-500",
    "data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-700",
    className
  )}
  {...props}
  ref={ref}
  onCheckedChange={onCheckedChange} // Pass it down
>
  <SwitchPrimitives.Thumb
    className={cn(
      "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
      "data-[state=checked]:bg-white dark:data-[state=checked]:bg-gray-800",
      "data-[state=unchecked]:bg-black dark:data-[state=unchecked]:bg-gray-300",
      "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    )}
  />
</SwitchPrimitives.Root>


=======
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
    onCheckedChange={onCheckedChange} // Pass it down
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 data-[state=checked]:bg-white data-[state=unchecked]:bg-black transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
