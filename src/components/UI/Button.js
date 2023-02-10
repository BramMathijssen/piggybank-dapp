import React from 'react'

import styles from './Button.module.scss'

const Button = ({className, onClick}) => {
  return (
    <button className={className} onClick={onClick}>Button</button>
  )
}

export default Button