import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">🚫 Access Forbidden</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">You do not have permission to access this page.</p>
        <Link href="/staging/verify" className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition active:scale-95">
          Go to Verification Page
        </Link>
      </div>
    </div>
  )
}