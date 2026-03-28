import React from 'react'
import {Link} from 'react-router-dom'
function NotFound() {

  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
          <Link className='btn btn-primary mt-5' to="/">Go To Home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound