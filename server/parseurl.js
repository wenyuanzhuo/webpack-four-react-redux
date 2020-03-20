const createReq = (url, originUrl) => {
  return {
    url,
    originUrl
  }
}
const req = createReq('https://127.0.0.1:8080/site/sff.html?a=1&b=2#abc')

const url = require('parseurl')(req)

console.log(url)