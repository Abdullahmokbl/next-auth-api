import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delAllProducts, delProduct, getSomeProducts } from "../../redux/productsSlice";
import { delUser, getSomeUsers } from "../../redux/usersSlice";
import styles from "./index.module.css";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faEdit,
  faGear,
  faMoneyBill,
  faSackDollar,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import Card from "../../components/Card";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import AdminLayout from "../../components/AdminLayout";

export default function Admin(props) {
  const { user, products, users, usersCount, u_pagesCount, productsCount, p_pagesCount } = props;
  const dispatch = useDispatch();
  const { someUsers } = useSelector(state => state.users);
  const { someProducts } = useSelector(state => state.products);
  const usersPag = someUsers || users;
  const productsPag = someProducts || products;

  const [userPage, setUserPage] = useState(1);
  const [productPage, setProductPage] = useState(1);

  const user_previous = async () => {
    if (userPage > 1) {
      await dispatch(getSomeUsers(userPage - 1));
      setUserPage(userPage - 1);
    }
  };
  const user_next = async () => {
    if (userPage < u_pagesCount) {
      await dispatch(getSomeUsers(userPage + 1));
      setUserPage(userPage + 1);
    }
  };
  const product_previous = async () => {
    if (productPage > 1) {
      await dispatch(getSomeProducts(productPage - 1));
      setProductPage(productPage - 1);
    }
  };
  const product_next = async () => {
    if (productPage < p_pagesCount) {
      await dispatch(getSomeProducts(productPage + 1));
      setProductPage(productPage + 1);
    }
  };

  let userId = userPage * 5 - 5;
  const user_info =
    usersPag?.length !== 0 &&
    usersPag?.map(user => {
      const { _id, name, email, gender, date } = user;
      userId++;
      return (
        <ul key={_id}>
          <li>{userId}</li>
          <li>{name}</li>
          <li>{email}</li>
          <li>{new Date(date).toDateString()}</li>
          <li>
            <div>
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div
              onClick={() => {
                if (confirm("Do you really want do delete " + name)) dispatch(delUser(_id));
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="xl" />
            </div>
          </li>
        </ul>
      );
    });
  let productId = productPage * 5 - 5;
  const product =
    productsPag?.length !== 0 &&
    productsPag?.map(product => {
      const { _id, name, price, info, seller } = product;
      productId++;
      return (
        <ul key={_id}>
          <li>{productId}</li>
          <li>{name}</li>
          <li>{price}</li>
          <li>{info}</li>
          <li>{seller}</li>
          <li>
            <div
              className={styles.delete}
              onClick={() => {
                if (confirm("Do you really want do delete " + name)) dispatch(delProduct(_id));
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="xl" />
            </div>
          </li>
        </ul>
      );
    });

  const Users = () => {
    return (
      <div className={styles.users}>
        <ul>
          <li>#</li>
          <li>Name</li>
          <li>Email</li>
          <li>Created At</li>
          <li>Action</li>
        </ul>
        {user_info}
      </div>
    );
  };
  const Products = () => {
    return (
      <div className={styles.products}>
        <ul>
          <li>ID</li>
          <li>Name</li>
          <li>Price</li>
          <li>Info</li>
          <li>Seller</li>
          <li>Delete</li>
        </ul>
        {product}
        <div
          className={styles.del_all}
          onClick={() => {
            if (confirm("Do you really want do delete all products")) dispatch(delAllProducts());
          }}
        >
          Delete All Products
        </div>
        <Pagination
          page={productPage}
          pagesCount={p_pagesCount}
          count={productsCount}
          previous={product_previous}
          next={product_next}
        />
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  const handleSidebar = () => {
    setOpen(!open);
  };
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {
    labels,
    datasets: [
      {
        label: "Online",
        data: [35000, 69000, 22500, 60000, 50000, 50000, 30000, 80000, 70000, 60000, 30000, 20000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Ofline",
        data: [45000, 82000, 35000, 93000, 71000, 89000, 49000, 91000, 80000, 86000, 35000, 40500],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: ["USA", "Brazil", "France", "UK", "China", "Egypt"],
    datasets: [
      {
        data: [535, 310, 200, 189, 100, 400],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  let xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const data3 = {
    labels: xValues,
    datasets: [
      {
        data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
        borderColor: "red",
        fill: false,
      },
      {
        data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
        borderColor: "green",
        fill: false,
      },
      {
        data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const options = {
    legend: { display: false },
  };

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
        <div className={styles.cards}>
          <Card icon={faUserPlus} text={"New Leads"} number={205} />
          <Card icon={faSackDollar} text={"Sales"} number={"$4021"} />
          <Card icon={faBasketShopping} text={"Orders"} number={80} />
          <Card icon={faMoneyBill} text={"Expense"} number={"$1200"} />
        </div>
        <div className={styles.sales}>
          <div className={styles.year_sales}>
            <div className={styles.sales_title}>This Year Sales</div>
            <Bar data={data} />
          </div>
          <div className={styles.countries_sales}>
            <div className={styles.sales_title}>Sales by Countries</div>
            <Pie data={data2} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.new_users}>
            <div className={styles.header}>
              <h3>New Users</h3>
              <div className={styles.dropdown}>
                <div className={styles.toggle}>
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className={styles.menu}></div>
              </div>
            </div>
            {/* <div className={styles.table}> */}
            {users?.length !== 0 ? <Users /> : <h3 className={styles.no}>There is no users</h3>}
            {/* </div> */}
          </div>
          <div className={styles.users_activity}>
            <h3>User activity</h3>
          </div>
        </div>
        <div className={styles.stats}>{/* <Line data={data4} options={options4} /> */}</div>
        {/* <h2>Users</h2>
        {users?.length !== 0 ? <Users /> : <h3 className={styles.no}>There is no users</h3>}
        <div className={styles.line}></div>
        <h2>Products</h2>
        {products?.length !== 0 ? <Products /> : <h3 className={styles.no}>There is no products</h3>} */}
      </div>
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) return { notFound: true };
  const token = await getToken(ctx);

  // if (token.isAdmin) {
  try {
    const productsRes = await axios.get(process.env.NEXT_PUBLIC_HOST + "/api/products?page=1");
    const usersRes = await axios.get(process.env.NEXT_PUBLIC_HOST + "/api/users?page=1");
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
    };
  } catch (e) {
    return { props: { user: session.user, products: null, users: null } };
  }
  // } else {
  //   return { notFound: true };
  // }
};
