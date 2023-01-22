import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "./AdminLayout";

export default function Layout(props) {
  const { pathname, push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (pathname === "/_error") push("/");
    }, 5000);
  });

  const Layout = () => (
    <>
      {pathname !== "/login" && pathname !== "/signup" && !pathname.startsWith("/admin") && pathname !== "/_error" && (
        <Navbar user={props.children.props.user} />
      )}
      {/* {pathname.startsWith("/admin") && <AdminLayout />} */}
      {props.children}
      {pathname !== "/login" && pathname !== "/signup" && !pathname.startsWith("/admin") && pathname !== "/_error" && <Footer />}
    </>
  );

  return <Layout />;
}
