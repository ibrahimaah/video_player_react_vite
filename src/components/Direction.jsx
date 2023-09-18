import React from 'react'

export default function Direction({onClickArrow}) {
  return (
    <div className="container">
        <div className="row justify-content-center">
        <div className="col-12 text-center">
            <button className='btn-direction top' name='btnTop' onClick={onClickArrow}></button>
        </div>
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-6 text-center">
            <button className='btn-direction left' name='btnLeft' onClick={onClickArrow}></button>
            </div>
            <div className="col-6 text-center">
            <button className='btn-direction right' name='btnRight' onClick={onClickArrow}></button>
            </div>
        </div>
        </div>
        <div className="col-12 text-center">
            <button className='btn-direction bottom' name='btnBottom' onClick={onClickArrow}></button>
        </div>
        </div>
    </div>
  )
}
