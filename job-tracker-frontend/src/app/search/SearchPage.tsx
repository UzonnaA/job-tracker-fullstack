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

export default function SearchPageContent() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<JobApplication | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [filterCompany, setFilterCompany] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterTag, setFilterTag] = useState('')

  const token = localStorage.getItem('token')

  const fetchApplications = () => {
    const params = new URLSearchParams()
    if (filterCompany) params.append('company', filterCompany)
    if (filterStatus) params.append('status', filterStatus)
    if (filterTag) params.append('tag', filterTag)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch applications')
        return res.json()
      })
      .then((data) => setApplications(data))
      .catch((err) => console.error('Error fetching jobs:', err))
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editForm) return
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleAddTag = () => {
    if (!editForm || tagInput.trim() === '') return
    setEditForm({ ...editForm, tags: [...editForm.tags, tagInput.trim()] })
    setTagInput('')
  }

  const handleRemoveTag = (index: number) => {
    if (!editForm) return
    const updatedTags = [...editForm.tags]
    updatedTags.splice(index, 1)
    setEditForm({ ...editForm, tags: updatedTags })
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !editForm) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(editForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update')
        return res.json()
      })
      .then(() => {
        fetchApplications()
        setEditingId(null)
        setEditForm(null)
        setTagInput('')
      })
      .catch((err) => console.error('Error updating job:', err))
  }

  const handleEditClick = (app: JobApplication) => {
    setEditingId(app.id || null)
    setEditForm(app)
    setTagInput('')
  }

  const handleDelete = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete')
        return res.text()
      })
      .then(() => fetchApplications())
      .catch((err) => console.error('Error deleting job:', err))
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Search Job Applications
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by company"
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchApplications}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Search
        </button>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <li
            key={app.id}
            className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            {editingId === app.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  type="text"
                  name="jobTitle"
                  value={editForm?.jobTitle || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="company"
                  value={editForm?.company || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
                <select
                  name="status"
                  value={editForm?.status || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <input
                  type="date"
                  name="applicationDate"
                  value={editForm?.applicationDate || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />

                {/* Tag controls */}
                <div>
                  <label className="block font-medium mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editForm?.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="font-semibold text-lg mb-1 text-gray-800">
                    {app.jobTitle} @ {app.company}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">Status: {app.status}</p>
                  <p className="text-sm text-gray-600 mb-1">Date: {app.applicationDate}</p>
                  <p className="text-sm text-gray-600 mb-2">Tags: {app.tags?.join(', ') || ''}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEditClick(app)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app.id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
