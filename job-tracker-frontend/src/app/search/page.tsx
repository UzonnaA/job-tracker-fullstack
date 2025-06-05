import ProtectedRoute from '../components/ProtectedRoute'
import AddSearchContent from './SearchPage'

export default function ProtectedSearchPage() {
  return (
    <ProtectedRoute>
      <AddSearchContent />
    </ProtectedRoute>
  )
}