import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import config from "../../Config";
import { storeFavorite } from "../../Services/store";

const windowWidth = Dimensions.get("window").width;

export default function ItemFavorite({ item, updateList }) {
  //   console.log(item);
  const dltFn = async () => {
    // console.log(item);
    await storeFavorite.remove_favorite(item._id);
    updateList();
  };

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
      <TouchableOpacity onPress={dltFn} style={styles.dltBtn}>
        <Text style={{ color: "#696969" }}>Delete</Text>
      </TouchableOpacity>
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
});
