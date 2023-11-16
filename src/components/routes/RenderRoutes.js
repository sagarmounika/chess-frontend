import {lazy} from "react"
import SignUp from "../SignUp/SignUp"
import Login from "../Login/Login"
import Layout from "../layout/Layout"

import Home from "../Home/Home"
import {Route, createRoutesFromElements} from "react-router-dom"

const ROUTES = createRoutesFromElements(
  <Route path="/">
    <Route path="/" element={<SignUp />} />
    <Route path="login" element={<Login />} />
    <Route element={<Layout />}>
      <Route path="home" element={<Home />} />
    </Route>
  </Route>
)
export default ROUTES
