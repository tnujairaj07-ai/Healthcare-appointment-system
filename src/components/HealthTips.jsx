import { useEffect, useState } from 'react'

const TIPS_API = 'https://mocki.io/v1/88802a4b-dbeb-415f-96a9-12a1a5f8fe2d'

export default function HealthTips() {
  const [tip, setTip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTip() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(TIPS_API)
        if (!res.ok) {
          throw new Error('Failed to fetch health tips')
        }
        const data = await res.json() // array of tips

        // pick a random tip from the array
        const randomIndex = Math.floor(Math.random() * data.length)
        setTip(data[randomIndex])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTip()
  }, [])

  if (loading) {
    return (
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        Loading health tip...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6 text-sm text-red-500">
        Could not load health tip: {error}
      </div>
    )
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-sm">
      <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
        Today&apos;s Health Tip
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        (From custom Mocki health tips API)
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        {tip?.message}
      </p>
    </div>
  )
}