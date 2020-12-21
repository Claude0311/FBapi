import react,{Component, useState, useEffect} from 'react'
import axios from 'axios'
import FacebookLogin from "react-facebook-login"
import {FB} from 'fb'
const backURL = ''//'http://localhost:4000'

const FBLogin = ()=>{
    const responseFacebook = async (res) => {
        if(res.status==='unknown') return
        console.log(res)
        const {picture:{data:imgurl},name,userID,accessToken} = res
        const imgUrl = await new Promise((resolve,reject)=>{
            const url = `/${userID}/picture`
            FB.setAccessToken(accessToken)
            FB.api(url,"GET",{redirect: false,height:720},//type:"large"},
                function(res) {
                    console.log(res)
                    if(!res || res.error) {
                        console.log(!res ? 'error occurred' : res.error);
                        return reject(false)
                    }
                    console.log(res.data.url)
                    resolve({url:res.data.url})
                }
            )
        })
        console.log({imgurl})
        setStatus('loading... it might take a while')
        axios.post(`${backURL}/register`,{imgurl,name})
        .then(({data})=>{
            console.log(data)
            setUrl(imgUrl.url)
            setStatus('驗證成功，您有加入EEplus社團')
        }).catch(e=>{
            console.log(e)
            setStatus('您似乎沒有加入社團')
        })
        console.log(res)
    }
    const [url,setUrl] = useState('')
    const [status,setStatus] = useState('點此檢查是否已加入社團')
    return (
    <>
        <p>{status}</p>
        <FacebookLogin
            appId="571174603253755"//"969130733557478"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
        /><br/>
        {url!=='' && <img src={url} alt="img"/>}
    </>
    )
}
export default FBLogin