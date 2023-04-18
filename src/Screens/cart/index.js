import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ItemCartProduct } from "../../Components";
import { storeCart } from "../../Services/store";

const Cart = ({ navigation }) => {
  const [cartList, setCartList] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const updateList = async () => {
    let array = await storeCart.get_cart_list();
    setCartList(array);
    updateTotalPrice();
  };
  const updateTotalPrice = async () => {
    let price = 0;
    let list = await storeCart.get_cart_list();
    if (list) {
      list.forEach((el) => {
        price += +el.price;
      });
    }
    setTotalPrice(price);
  };

  const deleteFn = () => {
    updateList();
    updateTotalPrice;
  };

  useEffect(() => {
    updateList();
    updateTotalPrice();
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      updateList();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={cartList}
      numColumns={1}
      horizontal={false}
      renderItem={({ item }) => (
        <ItemCartProduct
          key={item._id}
          item={item}
          setTotalPrice={setTotalPrice}
          deleteFn={deleteFn}
          navigation={navigation}
        />
      )}
      ListFooterComponent={() => {
        if (cartList?.length > 0) {
          return (
            <View style={styles.footer}>
              <Text style={styles.text}>Итого:</Text>
              <Text style={styles.text}>{Number(totalPrice).toFixed(1)}</Text>
            </View>
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(4, 40, 62)",
    height: 50,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
});

export default Cart;
