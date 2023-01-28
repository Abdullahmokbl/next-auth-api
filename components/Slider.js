import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Slider.module.css'

export default function Slider() {
  const { locale } = useRouter()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  const min = 0
  const max = 50000
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)
  const priceGap = 10000

  const handleMinRange = e => {
    console.log(maxPrice, minPrice)
    if (maxPrice - minPrice < priceGap) {
      console.log(maxPrice - minPrice)
      setMinPrice(maxPrice - priceGap)
    } else {
      console.log(e.target.value)
      setMinPrice(e.target.value)
    }
  }
  const handleMaxRange = e => {
    if (maxPrice - minPrice < priceGap) {
      setMaxPrice(minPrice + priceGap)
    } else {
      setMaxPrice(e.target.value)
    }
  }

  const left = (minPrice / max) * 100 + '%'
  const right = 100 - (maxPrice / max) * 100 + '%'
  const style = {
    left: dir === 'ltr' ? left : right,
    right: dir === 'ltr' ? right : left,
  }

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.progress} style={style}></div>
      </div>
      <div className={styles.range}>
        <input type="range" value={minPrice} onChange={handleMinRange} min={min} max={max} step="50" />
        <input type="range" value={maxPrice} onChange={handleMaxRange} min={min} max={max} step="50" />
      </div>
      <div className={styles.priceInput}>
        <div className={styles.field}>
          <input
            type="number"
            value={minPrice}
            onChange={e => {
              e.target.value >= min && setMinPrice(e.target.value)
            }}
            min={min}
            max={maxPrice}
          />
        </div>
        <div className={styles.separator}>-</div>
        <div className={styles.field}>
          <input
            type="number"
            value={maxPrice}
            onChange={e => {
              e.target.value <= max && setMaxPrice(e.target.value)
            }}
            min={minPrice}
            max={max}
          />
        </div>
      </div>
    </>
  )
}
