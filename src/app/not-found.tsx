import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-blue-200 mb-6">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
