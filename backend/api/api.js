
import express from 'express'
import inGroup from './inGroup'
// import {handleError,ErrorHandler} from './error'

const router = express.Router()
router.post('/register',
    inGroup
)


export default router