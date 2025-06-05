// stats/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error loading stats', err))
  }, [])

  if (!stats) return <p className="text-center mt-8">Loading stats...</p>

  const statusData = {
    labels: Object.keys(stats.byStatus),
    datasets: [
      {
        label: 'Applications by Status',
        data: Object.values(stats.byStatus),
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444'
        ],
      }
    ]
  }

  const companyData = {
    labels: Object.keys(stats.byCompany),
    datasets: [
      {
        label: 'Applications per Company',
        data: Object.values(stats.byCompany),
        backgroundColor: '#6366f1',
      }
    ]
  }

  const tagData = {
    labels: Object.keys(stats.byTag),
    datasets: [
      {
        label: 'Most Used Tags',
        data: Object.values(stats.byTag),
        backgroundColor: '#f97316',
      }
    ]
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">📊 Your Application Stats</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">By Status</h2>
        <Pie data={statusData} />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">By Company</h2>
        <Bar data={companyData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">By Tag</h2>
        <Bar data={tagData} />
      </div>
    </div>
  )
}
