/**
 * Navbar template – EquiForge / Laravel (Inertia).
 * Use in Layouts or Pages. Replace or extend as needed.
 */
import { Link } from "@inertiajs/react";

export function Navbar({ appName = "Laravel" }: { appName?: string }) {
  return (
    <header className="mx-4 mt-6">
      <div className="border border-black-200 rounded-2xl shadow-sm bg-white">
        <div className="flex justify-between items-center py-2 px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="whitespace-nowrap font-medium text-primary-600 hover:text-primary-700">
              {appName}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={route("login")}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-ef-label font-ef-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
