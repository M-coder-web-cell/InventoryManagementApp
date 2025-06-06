import express from 'express'
import {signup} from "../controllers/AuthControllers.js"

const UserRouter = express.Router()

UserRouter
    .route('/signup')
    .post(signup)

export {UserRouter}