import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import AdminNavbar from "../../components/AdminNavbar";
import { getSomeUsers } from "../../redux/usersSlice";
import styles from "./users.module.css";

export default function users(props) {
  const { user, users, usersCount, u_pagesCount } = props;
  const dispatch = useDispatch();
  const { someUsers } = useSelector(state => state.users);
  const usersPag = someUsers || users;
  const [userPage, setUserPage] = useState(1);

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
            <div
              className={styles.delete}
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

  const Users = () => {
    return (
      <div className={styles.all_users}>
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

  const [open, setOpen] = useState(false);
  const handleSidebar = () => {
    setOpen(!open);
  };
  return (
    <>
      <AdminLayout user={user} open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.users} ${open && styles.open}`}>
        {users?.length !== 0 ? <Users /> : <h3 className={styles.no}>There is no users</h3>}
      </div>
    </>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) return { notFound: true };
  const token = await getToken(ctx);

  if (token.isAdmin) {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_HOST + "/api/users?page=1");
      return {
        props: {
          user: session.user,
          users: res.data.users,
          u_pagesCount: res.data.pagesCount,
          usersCount: res.data.usersCount,
        },
      };
    } catch (e) {
      return { props: { user: session.user, users: null } };
    }
  } else {
    return { notFound: true };
  }
};
