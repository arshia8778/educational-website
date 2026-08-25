import React from 'react'
import { PropagateLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <>
<PropagateLoader color='var(--secondary-color) !important' className='spinner'/>
    </>
  )
}

export default Spinner