import webdriver,{Key,By, until} from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
const options = new chrome.Options()
    .addArguments('-incognito', '--disable-popup-blocking','--headless','--disable-gpu');


const username = 'x70908x7@yahoo.com.tw'
const password = '1u4n3j6u6'
const inputClass = 'oajrlxb2 rq0escxv f1sip0of hidtqoto lzcic4wl hzawbc8m ijkhr0an nlq1og4t sgqwj88q b3i9ofy5 oo9gr5id b1f16np4 hdh3q7d8 dwo3fsh8 qu0x051f esr5mh6w e9989ue4 r7d6kgcz br7hx15l h2jyy9rg n3ddgdk9 owxd89k7 ihxqhq3m jq4qci2q k4urcfbm iu8raji3 tv7at329 l60d2q6s d1544ag0 hwnh5xvq tw6a2znq o1lsuvei'
const asyncSome = async (arr, predicate) => {
	for (let e of arr) {
		if (await predicate(e)) return true;
	}
	return false;
};

const main = async (name='陳君輔')=>{
    let driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build()
    await driver.get('https://www.facebook.com/groups/ntueeplus/members')
    await driver.findElement(By.id('email')).sendKeys(username)//,Key.RETURN)
    await driver.findElement(By.id('pass')).sendKeys(password)//,Key.RETURN)
    await driver.findElement(By.name('login')).click()
    await driver.wait(until.elementsLocated(By.xpath('//input[@placeholder="搜尋成員"]')))
    await driver.findElement(By.xpath('//input[@placeholder="搜尋成員"]')).sendKeys(name,Key.RETURN)
    // console.log('jso')
    await driver.wait(until.elementsLocated(By.xpath('//span[text()="搜尋結果"]')))
    // console.log('show')
    await driver.wait(until.elementsLocated(By.className('b20td4e0 muag1w35')))
    await driver.wait(until.elementsLocated(By.className('ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi a8c37x1j')))
    const aTags = await driver.findElement(By.className('b20td4e0 muag1w35'))
        .findElements(By.className('ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi a8c37x1j'))
    return await asyncSome(aTags,async (elem)=>{
        const ijw = await elem.findElements(By.tagName('a'))
        const text = await ijw[1].getText()
        const text2 = await ijw[0].getAttribute('aria-label')
        console.log({text,text2},ijw.length)
        if(text===name || text2===name){
            return true
        }
        else{
            return false
        }
    })
}
// main('楊文')
// .then(res=>{
//     console.log({res})
// })
// .catch(e=>{
//     console.error(e)
// })
export {main as isInGroup}