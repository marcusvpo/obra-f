
interface ProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function ProgressBar({ progress, size = "md", color }: ProgressBarProps) {
  const height = {
    sm: "h-1",
    md: "h-2",
    lg: "h-2.5",
  }[size];
  
  // Ensure progress is between 0 and 100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={`w-full bg-[#444444] rounded-full ${height}`}>
      <div
        className={`rounded-full ${height}`}
        style={{ 
          width: `${safeProgress}%`, 
          transition: "width 0.5s ease-in-out",
          background: color || "linear-gradient(90deg, #FF6200 0%, #FF8C00 100%)" 
        }}
      />
    </div>
  );
}
