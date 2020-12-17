import Axios from 'axios'
import { isInGroup } from './crawler'

const inGroup = async (req,res,next)=>{
    const {name,imgurl} = req.body
    try{
        console.log({name,imgurl})
        const {data} = await Axios.get(imgurl.url,{
            responseType: 'arraybuffer'
        })
        console.log(data)
        const isMamber = await isInGroup(name,data)
        if(isMamber){
            console.log(isMamber)
            res.status(200).send('reg success')
        }else{
            throw new Error('no in group')
        }
    }catch(e){
        console.log(e)
        console.log('not in group')
        res.status(404).send('not in group')
    }
}

export default inGroup