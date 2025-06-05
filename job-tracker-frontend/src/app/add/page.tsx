import ProtectedRoute from '../components/ProtectedRoute'
import AddPageContent from './AddPage'

export default function ProtectedAddPage() {
  return (
    <ProtectedRoute>
      <AddPageContent />
    </ProtectedRoute>
  )
}