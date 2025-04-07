
interface ProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ progress, size = "md" }: ProgressBarProps) {
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
        className={`bg-primary rounded-full ${height}`}
        style={{ width: `${safeProgress}%`, transition: "width 0.5s ease-in-out" }}
      />
    </div>
  );
}
