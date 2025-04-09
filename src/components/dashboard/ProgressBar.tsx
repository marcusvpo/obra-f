
interface ProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  gradient?: boolean;
}

export default function ProgressBar({ progress, size = "md", color, gradient = false }: ProgressBarProps) {
  const height = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }[size];
  
  // Ensure progress is between 0 and 100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={`w-full bg-secondary rounded-full ${height}`}>
      <div
        className={`rounded-full ${height}`}
        style={{ 
          width: `${safeProgress}%`, 
          transition: "width 0.5s ease-in-out",
          backgroundColor: gradient ? 'transparent' : (color || "hsl(var(--primary))"),
          backgroundImage: gradient ? 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.8))' : 'none'
        }}
      />
    </div>
  );
}
