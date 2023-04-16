
import {
  getStorage,
  setStorage
} from './storege'
import { CART_LIST } from '../storeKeys'

const get_cart_list = async () => {
  return await getStorage(CART_LIST)
}

const remove_cart_list = async (item) => {
  let carts = await get_cart_list()
  carts = carts.filter((el) => el._id !== item._id)
  return await setStorage(CART_LIST, carts)
}

const set_cart_list = async (item, list) => {
  let carts = []
  if (list) {
    carts = list
  } else {

    carts = await get_cart_list()
    if (carts) {
      carts = carts.filter((el) => el._id !== item._id);
      carts.unshift(item);
    } else {
      carts = [item]
    }
  }

  return await setStorage(CART_LIST, carts)
}

const update_cart_list = async (item, count) => {
  let cartList = await get_cart_list();
  if (Array.isArray(cartList)) {
    cartList = cartList.map((el) => {
      if (el._id === item._id) return { ...el, count }
      return el
    })
  }
  await setStorage(CART_LIST, cartList)
  return cartList
}

const cart = {
  get_cart_list,
  update_cart_list,
  set_cart_list,
  remove_cart_list
}

export default cart