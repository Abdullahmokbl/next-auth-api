import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Overlay.module.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/usersSlice'

export default function Overlay({ userID, myRef, setIsComponentVisible, src }) {
  const dispatch = useDispatch()
  const [crop, setCrop] = useState(null)
  const [output, setOutput] = useState()

  const setNewProfilePicure = () => {
    // downloadBase64File('image/jpeg', output, 'ddd.png')
    // downloadBase64File(output, 'image/jpeg', 'test.jpeg')
    dispatch(updateUser({ userID, img: output }))
  }

  const handleImageLoaded = image => {
    console.log(image)
  }
  const handleOnCropComplete = (crop, pixelCrop) => {
    console.log(crop, pixelCrop)
    cropImageNow()
  }

  // const canvasRef = useRef()
  const cropImageNow = () => {
    const image = new Image()
    image.src = src
    const canvas = document.createElement('canvas')
    // const canvas = canvasRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg')
    setOutput(base64Image)
  }

  return (
    <div ref={myRef} className={styles.overlay}>
      <div className={styles.header}>
        <div>Crop your new profile picture</div>
        <FontAwesomeIcon icon={faClose} onClick={() => setIsComponentVisible(false)} />
      </div>
      <div className={styles.image}>
        <ReactCrop crop={crop} onImageLoaded={handleImageLoaded} onComplete={handleOnCropComplete} onChange={setCrop}>
          <img src={src} />
        </ReactCrop>
        {/* <Image src={URL.createObjectURL(input?.current?.files[0])} width={300} height={300} alt="ff" /> */}
      </div>
      <div className={styles.footer}>
        {/* <canvas ref={canvasRef}></canvas>
        <img src={output} /> */}
        {/* <a download="FILENAME.EXT" href={'data:image/jpeg;base64,' + output}>
          Download
        </a> */}
        <button onClick={setNewProfilePicure}>Set new profile picture</button>
      </div>
    </div>
  )
}
