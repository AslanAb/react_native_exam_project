import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ItemCartProduct } from '../../Components'
import { storeCart } from '../../Services/store'

const Cart = ({ navigation }) => {
  const [cartList, setCartList] = useState(null)
  const [totalPrice, setTotalPrice] = useState()

  const updateList = async () => {
    let array = await storeCart.get_cart_list()
    setCartList(array)
    updateTotalPrice()
  }
  const updateTotalPrice = async (array) => {
    let count = 0
    let list = await storeCart.get_cart_list()
    list.forEach(el => {
      count += +el.price
    })
    setTotalPrice(count)
  }

  const deleteFn = () => {
    updateList()
    updateTotalPrice
  }

  const [count, setCount] = useState(1)
  const inc = () => {
    setCount(prev => prev += 1)
  }
  const dec = () => {
    if (count === 1) {
      return
    }
    setCount(prev => prev -= 1)
  }

  useEffect(() => {
    updateList()
    updateTotalPrice()
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      updateList()
    });
    return unsubscribe;
  }, [navigation])

  return (
    <FlatList
      data={cartList}
      numColumns={1}
      horizontal={false}
      renderItem={({ item }) => (
        <ItemCartProduct key={item._id} item={item} setTotalPrice={setTotalPrice} deleteFn={deleteFn} />
      )}
      ListFooterComponent={() => {
        if (cartList?.length > 0) {
          return (
            <View style={styles.footer}>
              <Text>Итого:</Text>
              <Text>{Number(totalPrice).toFixed(1)}</Text>
            </View>
          )
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(4, 40, 62)',
    height: 50
  }
});

export default Cart