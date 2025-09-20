'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ route }: { route: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(route)}
      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white mb-4"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span className="font-medium">Back</span>
    </button>
  )
}
