import React from 'react'
import styles from "./brand.module.scss";
import brandLightImg from "../../../assets/brand-light.svg";
import brandDarkImg from "../../../assets/brand-dark.svg"
function BrandLogo(props){
  const {visible,className,type="light"}=props
  return (
    <article className={`${styles.brand} ${className}`}>
        <img src={type==="light"?brandDarkImg:brandLightImg} alt='brandlogo'></img>
        {!visible? (
          <h1>
            Note.<span>me</span>
          </h1>
    ) : null}
    </article>
  )
}

export default BrandLogo