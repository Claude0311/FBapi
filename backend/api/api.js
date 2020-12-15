import express from 'express'
import { isInGroup } from '../test'
// import {handleError,ErrorHandler} from './error'

const router = express.Router()
router.post('/register',
    async (req,res,next)=>{
        const {name} = req.body
        try{
            console.log({name})
            const isMamber = await isInGroup(name)
            if(isMamber){
                console.log(isMamber)
                res.status(200).send('reg success')
            }else{
                throw new Error('no in group')
            }
        }catch{
            res.status(404).send('not in group')
        }
    }
)

// router.use(handleError)

export default router