import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { constans } from "./Services/utils";
import ProductDetails from "./Screens/productDetails";
import Cart from "./Screens/cart";
import Products from "./Screens/products";
import Favorite from "./Screens/favorites";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { colors } = constans;
const defOptions = {
  headerTitleAlign: "center",
  headerTitleStyle: { fontWeight: "bold" },
  headerStyle: { backgroundColor: colors.mainColor },
  headerTintColor: "#fff",
  tabBarInactiveTintColor: "gray",
};

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          ...defOptions,
          title: "ShopMarket",
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ route }) => ({
          ...defOptions,
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="ShopMarket"
            screenOptions={({ route }) => ({
              tabBarStyle: { paddingBottom: 4 },
              tabBarActiveTintColor: colors.mainColor,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "HomeStack") {
                  iconName = focused ? "home-circle" : "home-circle-outline";
                } else if (route.name === "CartStack") {
                  iconName = focused ? "cart" : "cart-outline";
                } else if (route.name === "FavoriteStack") {
                  iconName = focused ? "heart-circle" : "heart-circle-outline";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
            })}
          >
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                headerShown: false,
                title: "Главная",
              }}
            />
            <Tab.Screen
              name="CartStack"
              component={Cart}
              options={{
                ...defOptions,
                title: "Корзина",
              }}
            />
            <Tab.Screen
              name="FavoriteStack"
              component={Favorite}
              options={{
                ...defOptions,
                title: "Избранное",
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Navigation;
