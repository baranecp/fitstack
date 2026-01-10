// app/not-found.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
      </div>
    </ThemeProvider>
  );
}
