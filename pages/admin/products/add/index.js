import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Select from '../../../../components/Select'
import { addProduct } from '../../../../redux/productsSlice'
import styles from './index.module.css'

export default function Add({ user }) {
  // const category = {
  //   fashion: {
  //     "Men's Fashion": ["clothing", "shoes", "watches"],
  //     "Women's Fashion": ["dresses", "shoes", "watches"],
  //     "Kid's fashion": ["clothing", "shoes"],
  //   },
  //   electronics: {
  //     cameras: ["lenses", "security cameras", "video cameras"],
  //     headphones: ["earbud", "on-ear", "over-ear"],
  //   },
  // };
  const category = ['Electronics', 'Fashion', 'Baby', 'Home & Office', 'Toys & Games', 'Musical Instruments']
  // const [second, setSecond] = useState(category.select);
  // console.log(select);
  // console.log(category.select);
  // console.log(typeof category.fashion);

  // const [select, setSelect] = useState("");
  // console.log(select);
  // const Category = () => {
  //   return (
  //     <div className="category">
  //       <select
  //         name="category"
  //         value={select}
  //         // defaultValue={{ label: "dd", value: 0 }}
  //         onChange={(e) => {
  //           setSelect(e.target.value);
  //         }}
  //         required
  //       >
  //         <option value="" disabled>
  //           --Please choose an option--
  //         </option>
  //         {cat.map((i) => {
  //           return (
  //             <option key={i} value={i}>
  //               {i}
  //             </option>
  //           );
  //         })}
  //       </select>
  //       {/* {select && (
  //         <select name="qqq">
  //           {second?.map((i) => {
  //             return (
  //               <option value={i} onChange={() => setSecond(2)}>
  //                 {i}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       )} */}
  //     </div>
  //   );
  // };

  const router = useRouter()
  const dispatch = useDispatch()
  const seller_name = user ? user.name : ''
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [product, setProduct] = useState({
    name: '',
    price: '',
    info: '',
    seller: seller_name,
  })
  const [img, setImg] = useState('')

  const handleChange = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }
  const handleImg = e => {
    setImg(e.target.files[0])
  }
  const handleSubmit = e => {
    e.preventDefault()
    setDisabled(true)
    if (img) {
      var formData = new FormData()
      formData.append('img', img)
      formData.append('product', JSON.stringify(product))
    }
    dispatch(addProduct(formData))
      .unwrap()
      .then(({ id }) => {
        setError('')
        router.push('/product/' + id)
      })
      .catch(e => {
        setDisabled(false)
        setError(e.msg)
      })
  }
  const login = () => {
    return (
      <Link href="login" className="button">
        Login to continue
      </Link>
    )
  }
  const form = () => {
    return (
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="error">{error}</div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={e => handleChange(e)} required />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" onChange={e => handleChange(e)} required />
        <label htmlFor="category">Category</label>
        <div className="category">
          <Select options={category} />
        </div>
        {/* <Category /> */}
        {/* <div className="category">
          <select id="category" name="category">
            <option value="aaa">ddddaaa</option>
            <option value="bbb">bbb</option>
            <option value="ccc">ccc</option>
          </select>
          <select id="category" name="category">
            <option value="aaa">aaa</option>
            <option value="bbb">bbb</option>
            <option value="ccc">ccc</option>
          </select>
          <select id="category" name="category">
            <option value="aaa">aaa</option>
            <option value="bbb">bbb</option>
            <option value="ccc">ccc</option>
          </select>
          <select id="category" name="category">
            <option value="aaa">aaa</option>
            <option value="bbb">bbb</option>
            <option value="ccc">ccc</option>
          </select>
        </div> */}
        <label htmlFor="stock">Stocking quantity</label>
        <input type="number" name="stock" min="0" onChange={e => handleChange(e)} required />
        <label htmlFor="info">Info</label>
        <input type="text" name="info" onChange={e => handleChange(e)} required />
        <label htmlFor="upload-photo">Picture</label>
        <input type="file" name="img" id="upload-photo" onChange={e => handleImg(e)} required />
        <button
          type="submit"
          disabled={disabled}
          style={disabled ? { opacity: 0.5, cursor: 'initial' } : { opacity: 1, cursor: 'pointer' }}
        >
          {disabled ? <FontAwesomeIcon icon={faSpinner} size="xl" spin /> : 'Add Product'}
        </button>
      </form>
    )
  }
  return <div className={styles.add}>{user ? form() : login()}</div>
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  if (!session) return { props: {} }
  return { props: { user: session.user } }
}
