
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
    if(item !== 'original_information') {
      const newKey = tmp[item]
      tmps[newKey] = peopleDetail[item]
    }
  }
  for(const key in tmps) {
    arr.push({
      id: key,
      value: tmps[key]
    })
  }
  return arr
}