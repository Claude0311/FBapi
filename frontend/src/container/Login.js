import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
import FacebookLogin from "react-facebook-login"

const FBLogin = ()=>{
    const responseFacebook = async (res) => {
        if(res.status==='unknown') return
        console.log(res)
        const {picture:{data}} = res
        setUrl(data.url)
        const members = await axios.get('https://www.facebook.com/groups/ntueeplus/members')
        console.log(members)
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