import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorage = async (key)=>{
  let store = {}
  const checkStore = JSON.parse(await AsyncStorage.getItem('store'))
  
  if(checkStore){
    store = checkStore  
  }

  return key ? store[key] : store
}

const setStorage = async (key, newValue)=>{
  let store = await getStorage()

  if(store) store[key] = newValue

  return await AsyncStorage.setItem('store', JSON.stringify(store))
}

export {
  getStorage,
  setStorage
}