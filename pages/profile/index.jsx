import { getSession, useSession } from 'next-auth/react'
import styles from './index.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import useComponentVisible from '../../components/useComponentVisible'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Overlay from '../../components/Overlay'

export default function profile({ user }) {
  const input = useRef()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const setNewProfilePicure = () => {}

  // const [crop, setCrop] = useState(null)
  const [src, setSrc] = useState(null)

  // const Box = () => {
  //   return (
  //     <div ref={ref} className={styles.box}>
  //       <div className={styles.header}>
  //         <div>Crop your new profile picture</div>
  //         <FontAwesomeIcon icon={faClose} onClick={() => setIsComponentVisible(false)} />
  //       </div>
  //       <div className={styles.image}>
  //         <ReactCrop crop={crop} onChange={setCrop}>
  //           <img src={src} />
  //         </ReactCrop>
  //         {/* <Image src={URL.createObjectURL(input?.current?.files[0])} width={300} height={300} alt="ff" /> */}
  //       </div>
  //       <div className={styles.footer}>
  //         <button onClick={setNewProfilePicure}>Set new profile picture</button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className={styles.profile}>
      {isComponentVisible && <Overlay userID={user.id} myRef={ref} setIsComponentVisible={setIsComponentVisible} src={src} />}
      <div className={styles.img} onClick={() => input.current.click()}>
        <FontAwesomeIcon icon={faUser} size="xl" />
        <FontAwesomeIcon icon={faUserPlus} size="xl" />
        <input
          type="file"
          ref={input}
          style={{ display: 'none' }}
          onChange={e => {
            // console.log(e.target.files[0])
            // console.log(URL.createObjectURL(e.target.files[0]))
            setSrc(URL.createObjectURL(e.target.files[0]))
            // setImage(URL.createObjectURL(input?.current?.files[0]))
            setIsComponentVisible(!isComponentVisible)
            // cropImageNow(URL.createObjectURL(e.target.files[0]))
          }}
        />
      </div>
      <div className={styles.info}>
        <h3>Information</h3>
        <div>Username</div>
        <input value={user.name} disabled />
        <div>Email</div>
        <input value={user.email} disabled />
        <div>Phone</div>
        <input value={user.email} disabled />
      </div>
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  if (!session) return { notFound: true }
  return { props: { user: session.user } }
}
