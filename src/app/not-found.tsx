import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep via-deep-2 to-deep">
      <div className="text-center px-6">
        <h1 className="font-display text-8xl font-bold text-green-light mb-4">404</h1>
        <h2 className="font-display text-2xl text-white mb-6">Page Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
