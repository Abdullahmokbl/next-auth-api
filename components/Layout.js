import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'

export default function Layout(props) {
  const { pathname, push } = useRouter()
  useEffect(() => {
    setTimeout(() => {
      if (pathname === '/_error') push('/')
    }, 5000)
  })

  const Layout = () => (
    <>
      {pathname !== '/login' && pathname !== '/signup' && pathname !== '/_error' && (
        <>
          <Navbar user={props.children.props.user} />
          <div style={{ height: '60px' }}></div>
        </>
      )}
      {props.children}
      {pathname !== '/login' && pathname !== '/signup' && pathname !== '/_error' && <Footer />}
    </>
  )

  return <Layout />
}
