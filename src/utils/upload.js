export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// export function saveImg (url) {
//   fs.writeFile('./assets/img.txt', url, function(err) {
//     if (err) {
//       throw err;
//     }
//   })
// }

export function getUrl(img) {
  const objecturl =  window.URL.createObjectURL(img);
  console.log(333,objecturl)
  return objecturl
}

export const uuid =  () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}