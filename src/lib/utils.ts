
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
export function formatDate(date: string): string {
  if (!date) return '';
  
  // Check if date is already in DD/MM/YYYY format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date;
  }
  
  // Convert from YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

// Format number with thousand separator
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Get color based on percentage
export function getColorByPercentage(percentage: number): string {
  if (percentage >= 75) return 'green';
  if (percentage >= 50) return 'yellow';
  return 'red';
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Create animation variants for staggered children
export const staggeredAnimation = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
};

// Create fade-in animation
export const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

// Create slide-in animation
export const slideInAnimation = (direction: 'left' | 'right' | 'top' | 'bottom') => {
  const directionMap = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    top: { x: 0, y: -20 },
    bottom: { x: 0, y: 20 }
  };
  
  return {
    initial: { opacity: 0, ...directionMap[direction] },
    animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } }
  };
};

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
