import express from 'express'
import {signup, login, logout, protect} from "../controllers/AuthControllers.js"
import { getOwnUserInfo } from '../controllers/UserControllers.js'

const UserRouter = express.Router()

UserRouter
    .route('/signup')
    .post(signup)
UserRouter
    .route('/login')
    .post(login)
UserRouter
    .route('/logout')
    .post(logout)
UserRouter
    .route("/getUserInfo")
    .get(protect, getOwnUserInfo)
export {UserRouter}