import resemble from 'resemblejs'

const compare = (img1,img2) => {
  return new Promise((resolve,reject)=>{
    resemble(img1)
      .compareTo(img2)
      .scaleToSameSize()
      .onComplete(({misMatchPercentage})=>{
        console.log('mismatch percentage:',misMatchPercentage)
        console.log('true if <30.0')
        if(misMatchPercentage<30) resolve(true)
        else resolve(false)
      })
  })
}


export {compare}