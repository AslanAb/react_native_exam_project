
import {
  getStorage,
  setStorage
} from './storege'
import {FAVORITE_LIST} from '../storeKeys'

const get_favorite_list = async()=>{
  return await getStorage(FAVORITE_LIST)
}

const remove_favorite = async(_id)=>{
  let favorites = await get_favorite_list().filter((el)=> el._id !== _id)

  return await setStorage(FAVORITE_LIST, favorites)
}

const set_favorite = async(item)=>{

  let favorites = await get_favorite_list()

  if(favorites){
    favorites = favorites.filter((el)=> el._id !== item._id)
    favorites.unshift(item)
  }else{
    favorites = [item]
  }

  return await setStorage(FAVORITE_LIST, favorites)
}

const favorite = {
  get_favorite_list,
  set_favorite,
  remove_favorite
}

export default favorite