
import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dateFormat?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, dateFormat, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "");
    
    const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!dateFormat) return;
      
      let input = e.target.value.replace(/\D/g, ''); // Remove all non-digits
      
      // Limit to 8 digits (DDMMYYYY)
      if (input.length > 8) input = input.substring(0, 8);
      
      // Format with slashes
      if (input.length > 4) {
        input = input.substring(0, 2) + '/' + input.substring(2, 4) + '/' + input.substring(4);
      } else if (input.length > 2) {
        input = input.substring(0, 2) + '/' + input.substring(2);
      }
      
      setValue(input);
      
      // Create a synthetic event to pass back the formatted value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: input
        }
      };
      
      if (props.onChange) {
        props.onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };

    // Handle phone format
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Check if this is a phone-type input based on placeholder
      const isPhone = props.placeholder?.includes("(") || /^\(\d+\)/.test(e.target.value);
      
      if (!isPhone) return;
      
      let input = e.target.value.replace(/\D/g, '');
      
      // Format phone number
      if (input.length > 0) {
        input = '(' + input;
        
        if (input.length > 3) {
          input = input.substring(0, 3) + ') ' + input.substring(3);
        }
        
        if (input.length > 10) {
          // Format for the rest of the digits
          if (input.length <= 13) {
            input = input.substring(0, 10) + '-' + input.substring(10);
          } else {
            input = input.substring(0, 10) + input.substring(10, 15);
          }
        }
      }
      
      // Create a synthetic event to pass back the formatted value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: input
        }
      };
      
      if (props.onChange) {
        props.onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };

    React.useEffect(() => {
      if (props.value !== undefined && props.value !== value) {
        setValue(props.value);
      }
    }, [props.value]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-gray-300/80",
          className
        )}
        ref={ref}
        value={dateFormat ? value : undefined}
        onChange={dateFormat ? handleDateInput : handlePhoneInput}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
