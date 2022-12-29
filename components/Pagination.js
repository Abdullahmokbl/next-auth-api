import React from 'react';
import styles from '../styles/Pagination.module.css';

export default function Pagination(props) {
  const { page, pagesCount, count, previous, next } = props;
  if(page === pagesCount){
    var last_num = count;
  }else{
    var last_num = page*5;
  }
  var first_num = page*5-4;
  
  return (
    <div className={styles.pagination}>
      <span style={{backgroundColor: page !==1 && '#7a5f93'}} onClick={()=> previous()}>&lt;</span>
      <span>{first_num} - {last_num}</span>
      <span style={{backgroundColor: page !==pagesCount && '#7a5f93'}} onClick={()=> next()}>&gt;</span>
    </div>
  )
}
