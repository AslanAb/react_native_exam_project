import { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { productsGQL } from "../../Services/gqls";
import { getProduct } from "./actions/index";
import config from "../../Config";
import { storeFavorite } from "../../Services/store";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const ProductDetails = ({ route }) => {
  const [productData, setProducData] = useState(route.params?.item);
  const putProduct = (data) => {
    setProducData(data);
  };
  useQuery(
    productsGQL.getProduct,
    getProduct(putProduct, route.params?.item?._id)
  );

  const [favorStatus, setFavorStatus] = useState(false);
  const putInFavorite = async () => {
    if (!favorStatus || !route.params.item.inFavorite) {
      setFavorStatus(true);
      await storeFavorite.set_favorite(route.params?.item);
    }
  };

  return (
    <View style={styles.itemContent}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <View style={styles.header}>
                <Image
                  resizeMode="cover"
                  style={styles.productImg}
                  source={{ uri: `${config.public}${productData.picture}` }}
                />
                <View style={styles.characteristics}>
                  <Text style={styles.title} numberOfLines={3}>
                    {productData.title}
                  </Text>
                  <TouchableOpacity onPress={putInFavorite}>
                    <View style={styles.btn}>
                      <AntDesign name={"heart"} size={23} color={"black"} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.title1}>Характеристики:</Text>
            </>
          );
        }}
        data={productData.addition_product?.characteristics}
        numColumns={1}
        horizontal={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.characteristics}>
            <Text style={styles.text1}>{item?.name}:</Text>
            <Text style={styles.text2}>{item?.value}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.title1}>Описание:</Text>
            <Text style={styles.text2}>{productData.description}</Text>
            <View style={styles.characteristics}>
              <Text style={styles.text3}>Цвет:</Text>
              <Text style={styles.text2}>{productData.color}</Text>
            </View>
            <View style={styles.characteristics}>
              <Text style={styles.text3}>Категория:</Text>
              <Text style={styles.text2}>{productData.category.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContent: {
    backgroundColor: "#f1f1f1",
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
    height: 400,
    width: "90%",
    borderRadius: 12,
  },
  title: {
    fontSize: windowWidth * 0.05,
    fontWeight: 900,
    margin: "auto",
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
  btn: {
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 6,
    width: 40,
    height: 40,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetails;
