import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ItemFavorite } from "../../Components";
import { storeFavorite } from "../../Services/store";
import { useQuery } from "@apollo/client";

const Favorite = ({ navigation }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const updateList = async () => {
    let array = await storeFavorite.get_favorite_list();
    setFavoriteList(array);
  };
  useEffect(() => {
    updateList();
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      updateList();
    });
    return unsubscribe;
  }, [navigation]);
  //   console.log(favoriteList);
  return (
    <FlatList
      data={favoriteList}
      numColumns={1}
      horizontal={false}
      renderItem={({ item }) => (
        <ItemFavorite key={item._id} item={item} updateList={updateList} />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default Favorite;
