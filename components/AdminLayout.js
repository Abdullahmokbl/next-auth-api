import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'

export default function AdminLayout(props) {
  const { open, handleSidebar } = props
  return (
    <>
      <AdminNavbar open={open} handleSidebar={handleSidebar} />
      <div style={{ height: '60px' }}></div>
      <Sidebar open={open} />
    </>
  )
}
