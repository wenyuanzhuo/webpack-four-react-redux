// const peopleDetail = {
  // "name": "温远卓",
  // "sex": "男",
  // "birthday": "1996年8月5日",
  // "identification": "36020219960805301X",
  // "address": "江西省景德镇市昌江区景航公司608号",
  // "nationality": "汉",
  // "original_information": [
  //   "姓名温远卓",
  //   "性男民族汉",
  //   "出生1996年8月5日",
  //   "住址江西省景德镇市昌江区景",
  //   "航公司608号",
  //   "公民身份号码36020219960805301X"
  // ]
// }
export const tmp = {
  "name": "姓名",
  "sex": "性别",
  "birthday": "出生",
  "identification": "公民身份号码",
  "address": "住址",
  "nationality": "民族",
  "original_information": "original_information"
}
export const tmp2 = {
  "name": "姓名",
  "sex": "性别",
  "birthday": "出生",
  "identification": "公民身份号码",
  "address": "住址",
  "nationality": "民族",
}
export const transImgResultInfo = (peopleDetail, tmp) => {
  const tmps = {}
  const arr = []
  for (const item in peopleDetail) {
    const newKey = tmp[item]
    tmps[newKey] = peopleDetail[item]

  }
  for(const key in tmps) {
    arr.push({
      id: key,
      value: tmps[key]
    })
  }
  return arr
}