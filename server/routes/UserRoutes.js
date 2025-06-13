import express from 'express'
import {signup, login, logout} from "../controllers/AuthControllers.js"

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

export {UserRouter}