import React, { useState } from 'react'
import styles from './index.module.css'
import { faBasketShopping, faMoneyBill, faSackDollar, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import Card from '../../components/Card'
import Cards from '../../components/Cards'
import { Bar, Line, Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import AdminLayout from '../../components/AdminLayout'
import Items from '../../components/Items'

export default function Admin(props) {
  const { user, users, usersCount, u_pagesCount } = props

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = {
    labels,
    datasets: [
      {
        label: 'Online',
        data: [35000, 69000, 22500, 60000, 50000, 50000, 30000, 80000, 70000, 60000, 30000, 20000],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ofline',
        data: [45000, 82000, 35000, 93000, 71000, 89000, 49000, 91000, 80000, 86000, 35000, 40500],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  const data2 = {
    labels: ['USA', 'Brazil', 'France', 'UK', 'China', 'Egypt'],
    datasets: [
      {
        data: [535, 310, 200, 189, 100, 400],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  let xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

  const data3 = {
    labels: xValues,
    datasets: [
      {
        data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
        borderColor: 'red',
        fill: false,
      },
      {
        data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
        borderColor: 'green',
        fill: false,
      },
      {
        data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
        borderColor: 'blue',
        fill: false,
      },
    ],
  }

  const options = {
    legend: { display: false },
  }

  // const options4 = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };

  // const labels4 = ["January", "February", "March", "April", "May", "June", "July"];

  // const data4 = {
  //   labels4,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: "Dataset 2",
  //       data: [1, 0.4, 0.5, 0.1, 0.2, 0, 0.1],
  //       borderColor: "red",
  //       backgroundColor: "blue",
  //     },
  //   ],
  // };

  return (
    <div className={styles.admin}>
      <AdminLayout user={user} open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.main} ${open && styles.open}`}>
        <Cards>
          <Card icon={faUserPlus} text={'New Leads'} number={205} />
          <Card icon={faSackDollar} text={'Sales'} number={'$4021'} />
          <Card icon={faBasketShopping} text={'Orders'} number={80} />
          <Card icon={faMoneyBill} text={'Expense'} number={'$1200'} />
        </Cards>
        {/* <div className={styles.cards}>
        </div> */}
        <Cards>
          <div className={styles.year_sales}>
            <div className={styles.sales_title}>This Year Sales</div>
            <Bar data={data} />
          </div>
          <div className={styles.countries_sales}>
            <div className={styles.sales_title}>Sales by Countries</div>
            <Pie data={data2} />
          </div>
        </Cards>
        <Cards>
          <div className={styles.new_users}>
            <Items type="user" items={users} count={usersCount} pagesCount={u_pagesCount} />
          </div>
          <div className={styles.users_activity}>
            <h3>User activity</h3>
          </div>
        </Cards>
        <div className={styles.stats}>{/* <Line data={data4} options={options4} /> */}</div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  if (!session) return { notFound: true }
  const token = await getToken(ctx)

  // if (token.isAdmin) {
  try {
    const productsRes = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products?page=1')
    const usersRes = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/users?page=1')
    return {
      props: {
        user: session.user,
        products: productsRes.data.products,
        p_pagesCount: productsRes.data.pagesCount,
        productsCount: productsRes.data.productsCount,
        users: usersRes.data.users,
        u_pagesCount: usersRes.data.pagesCount,
        usersCount: usersRes.data.usersCount,
      },
    }
  } catch (e) {
    return { props: { user: session.user, products: null, users: null } }
  }
  // } else {
  //   return { notFound: true };
  // }
}
