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