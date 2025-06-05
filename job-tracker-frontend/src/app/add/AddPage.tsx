'use client'
import { useEffect, useState } from 'react'

type JobApplication = {
  id?: number
  jobTitle: string
  company: string
  status: string
  applicationDate: string
  tags: string[]
}

export default function AddPageContent() {
  const [formData, setFormData] = useState<JobApplication>({
    jobTitle: '',
    company: '',
    status: '',
    applicationDate: '',
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [recentApps, setRecentApps] = useState<JobApplication[]>([])
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRecentApps(data.slice(-4).reverse()))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    const updated = [...formData.tags]
    updated.splice(index, 1)
    setFormData({ ...formData, tags: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormData({ jobTitle: '', company: '', status: '', applicationDate: '', tags: [] })
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      })
      .then((res) => res.json())
      .then((data) => setRecentApps(data.slice(-4).reverse()))
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Add Job Application
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-xl">
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="date"
          name="applicationDate"
          aria-label="Application Date"
          value={formData.applicationDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Tag input and display */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="border p-3 rounded-lg w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(idx)}
                  className="text-red-600 hover:text-red-900 transform transition hover:scale-150 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Add Application
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4 mt-8 text-gray-800">
        Recently Added Applications
      </h2>
      <ul className="space-y-4">
        {recentApps.map(app => (
          <li key={app.id} className="p-4 border rounded-xl shadow-sm bg-white">
            <p className="font-semibold text-lg text-gray-800">{app.jobTitle} @ {app.company}</p>
            <p className="text-sm text-gray-600">Status: {app.status}</p>
            <p className="text-sm text-gray-600">Date: {app.applicationDate}</p>
            <p className="text-sm text-gray-600">Tags: {app.tags?.join(', ') || 'None'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

  
