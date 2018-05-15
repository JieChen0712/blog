export function setCookie (name, value, time) {
  var oDate = new Date()
  oDate.setDate(oDate.getDate() + time)
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString()
}

export function getCookie (name) {
  let arr1 = document.cookie.split('; ')
  for (let i = 0; i < arr1.length; i++) {
    let arr2 = arr1[i].split('=')
    if (arr2[0] === name) {
      return decodeURI(arr2[1])
    }
  }
}

export function delCookie (name) {
  setCookie(name, ' ', -1)
}
