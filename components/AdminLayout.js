import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function AdminLayout(props) {
  const { user, open, handleSidebar } = props;
  return (
    <>
      <AdminNavbar user={user} open={open} handleSidebar={handleSidebar} />
      <div style={{ height: "60px" }}></div>
      <Sidebar open={open} />
    </>
  );
}
