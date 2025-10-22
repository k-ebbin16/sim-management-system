import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-background flex min-h-dvh items-center justify-center p-6">
      <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <h1 className="text-foreground text-6xl font-extrabold">404</h1>
        <h2 className="text-foreground mt-4 text-2xl font-semibold">
          Page not found
        </h2>
        <p className="text-muted-foreground mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-primary text-primary-foreground inline-block rounded-lg px-4 py-2 hover:opacity-95"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
