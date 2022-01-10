import React from 'react'

const ButtonProgress = (props) => {
  return (
    <button
      className='btn btn-primary'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
      {props.pendingApiCall && (
        <div className='spinner-border text-light spinner-border-sm mr-sm-1'>
          <span className='sr-only'> </span>
        </div>
      )}
    </button>
  )
}

export default ButtonProgress
