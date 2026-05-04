"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="text-lg font-semibold text-red-500">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-muted">
        {error.message || "Unexpected error occurred"}
      </p>

      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}