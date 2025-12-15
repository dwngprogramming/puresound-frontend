'use client'

import {verifyStagingToken} from '../../actions'
import {notFound} from 'next/navigation'
import {useActionState, useEffect, useState} from 'react'

const initialState = { error: '' }

export default function StagingVerifyPage() {
  const [isStaging, setIsStaging] = useState(true)
  
  // Check environment on mount
  useEffect(() => {
    console.log('APP ENV:', process.env.NEXT_PUBLIC_APP_ENV);
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'staging') {
      setIsStaging(false)
      notFound() // Return 404 if not staging
    }
  }, [])
  
  const [state, formAction] = useActionState(verifyStagingToken, initialState)
  
  if (!isStaging) return null
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">🚧 PureSound Staging Environment Verification</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Please input token to access Staging UI Page.</p>
        
        <form action={formAction} className="space-y-4">
          <input
            name="token"
            type="password"
            placeholder="Staging Token..."
            required
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          
          {state?.error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {state.error}
            </div>
          )}
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition active:scale-95">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}