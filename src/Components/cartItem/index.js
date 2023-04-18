import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import config from "../../Config";
import { constans, helpers } from "../../Services/utils";
import { storeCart } from "../../Services/store";

const windowWidth = Dimensions.get("window").width;

export default function ItemCartProduct({
  item,
  setTotalPrice,
  deleteFn,
  navigation,
}) {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(+item.price);
  const inc = () => {
    setPrice((prev) => (prev += +item.price));
    setCount((prev) => (prev += 1));
    setTotalPrice((prev) => (prev = +prev + +item.price));
  };
  const dec = () => {
    if (count === 1) {
      return;
    }
    setPrice((prev) => (prev -= +item.price));
    setCount((prev) => (prev -= 1));
    setTotalPrice((prev) => (prev = +prev - +item.price));
  };

  const dltFn = async () => {
    await storeCart.remove_cart_list(item);
    item.inCart = false;
    deleteFn();
  };

  useEffect(() => {
    const update = navigation.addListener("tabPress", (e) => {
      setCount(1);
      setPrice(+item.price);
    });
    return update;
  }, []);

  return (
    <View style={styles.itemContent}>
      <View style={styles.header}>
        <Image
          resizeMode="cover"
          style={styles.productImg}
          source={{ uri: `${config.public}${item.picture}` }}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <Text style={styles.text2}>{item.category.title}</Text>
      <View style={styles.characteristics}>
        <Text style={styles.text1}>Цвет:</Text>
        <Text style={styles.text2}>{item.color}</Text>
      </View>
      <View style={styles.characteristics1}>
        <View style={styles.characteristics}>
          <TouchableOpacity onPress={inc} style={styles.btn}>
            <Text style={{ color: "#696969" }}>+</Text>
          </TouchableOpacity>
          <Text style={styles.text4}>{count}</Text>
          <TouchableOpacity onPress={dec} style={styles.btn}>
            <Text style={{ color: "#696969" }}>-</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text4}>{price.toFixed(1)}</Text>
      </View>
      <View style={styles.characteristics1}>
        <TouchableOpacity onPress={dltFn} style={styles.dltBtn}>
          <Text style={{ color: "#696969" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContent: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
  },
  itemFooter: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImg: {
    height: 300,
    width: "50%",
    borderRadius: 12,
  },
  title: {
    fontSize: windowWidth * 0.04,
    fontWeight: 700,
    margin: "auto",
    color: "#696969",
  },
  title1: {
    fontSize: windowWidth * 0.04,
    fontWeight: 900,
    color: "black",
    borderBottomColor: "#696969",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
  },
  characteristics: {
    flexDirection: "row",
    alignItems: "center",
  },
  characteristics1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontWeight: 700,
    marginRight: 5,
    color: "#696969",
  },
  text2: {
    color: "#696969",
  },
  text3: {
    fontSize: windowWidth * 0.04,
    fontWeight: 700,
    marginRight: 5,
  },
  btn: {
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 6,
    borderColor: "#696969",
    width: 25,
    height: 25,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginRight: 5,
  },
  dltBtn: {
    borderWidth: 2,
    borderColor: "#696969",
    borderStyle: "solid",
    borderRadius: 6,
    width: 50,
    height: 25,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  text4: {
    fontSize: windowWidth * 0.04,
    fontWeight: 700,
    marginRight: 5,
    height: 25,
    marginTop: 5,
    color: "#696969",
  },
});
