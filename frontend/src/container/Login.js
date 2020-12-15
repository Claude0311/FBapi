import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
import FacebookLogin from "react-facebook-login"

const FBLogin = ()=>{
    const responseFacebook = async (res) => {
        if(res.status==='unknown') return
        console.log(res)
        const {picture:{data:imgurl},name} = res
        axios.post('http://localhost:4000/register',{name})
        .then(({data})=>{
            console.log(data)
            setUrl(imgurl.url)
        }).catch(
            e=>{
                console.log(e)
            }
        )
        console.log(res)
    }
    const [url,setUrl] = useState('')
    return (
    <>
        <FacebookLogin
            appId="969130733557478"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
        />
        <img src={url} alt="img"/>
    </>
    )
}
export default FBLogin