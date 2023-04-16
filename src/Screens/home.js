import React from 'react';
import {View, Text} from 'react-native';
const Home = ({navigation})=>{
  
  return(
    <View>
      <Text onPress={()=>navigation.navigate('Products', {title: 'Products'})}>Screen1</Text>
    </View>
  )
}

export default Home