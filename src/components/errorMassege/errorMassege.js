import React from "react";

function ErrorMessage({errorMessage}) {
  return(
    <>
      <h2 className='text text_type_main-large'>{errorMessage}</h2>
    </>
  )
}

export default ErrorMessage;