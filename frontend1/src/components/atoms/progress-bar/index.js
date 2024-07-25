import React from 'react'
import styels from "./bar.module.scss"

function ProgressBar(props) {
  const{percentage} =props
    return (
    <div className={styels.container}>
        <span style={{width:percentage}}>
        </span>
    </div>
  )
}

export default ProgressBar