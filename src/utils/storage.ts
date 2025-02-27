export enum StorageType {
  Token = 'token', // 登录 token
}

export const getLocalStorage = (str: StorageType) => {
  return localStorage.getItem(str)
}

export const setLocalStorage = (key: StorageType, value: any) => {
  localStorage.setItem(key, value)
}

export const removeLocalStorage = (key: StorageType) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
