import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#181818]/90 border border-[#F3B334]/40 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-slide-up">
      <CheckCircle2 className="w-4 h-4 text-[#F3B334]" />
      <span>{message}</span>
    </div>
  );
}
