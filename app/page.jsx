"use client"

import PrivateRoute from "./PrivateRoute"
const Homepage = () => {
  return (
    <PrivateRoute>

    <div>Homepage</div>
    </PrivateRoute>
  )
}

export default Homepage