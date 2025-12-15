'use client'

import { useFormState } from 'react-dom'
import { generateStagingToken } from '../../actions'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

const initialState = { error: '', success: false, newToken: '', name: '' }

export default function StagingAdminPage() {
  // Check môi trường
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'staging') {
      notFound()  // Return 404
    }
  }, [])
  
  // @ts-ignore
  const [state, formAction] = useFormState(generateStagingToken, initialState)
  const [copied, setCopied] = useState(false)
  const [showToken, setShowToken] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">🛡️ Admin Token Generator</h2>
        
        <div className="bg-slate-100 p-6 rounded-lg mb-8 border border-slate-200">
          <h3 className="font-semibold mb-4 text-slate-700">Tạo Token Mới</h3>
          <form action={formAction} className="flex gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Role:</span>
              <select
                name="role"
                className="bg-gray-600 text-gray-200 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                defaultValue="developer"
                required
              >
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
                <option value="client">Client</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Name:</span>
              <input
                name="name"
                placeholder="User Name (VD: Tester A, Client B...)"
                className="flex-1 bg-gray-600 text-gray-200 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium transition">
              Generate
            </button>
          </form>
          {state?.error && <p className="text-red-500 mt-2 text-sm">{state.error}</p>}
        </div>
        
        {state?.success && (
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded mt-4">
            <p className="text-green-800 font-medium">✅ Tạo thành công cho: {state.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1">
                <input
                  type={showToken ? "text" : "password"} // Bật tắt type
                  value={state.newToken}
                  readOnly
                  className="bg-white px-3 py-2 rounded border font-mono text-sm flex-1 text-gray-600 focus:outline-none w-full"
                />
                
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="p-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded"
                >
                  {showToken ? "Hide" : "Show"}
                </button>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(state.newToken)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="text-sm text-blue-600 hover:underline px-3 font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}