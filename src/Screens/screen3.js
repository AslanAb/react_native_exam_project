import React from 'react'
import {View, Text} from 'react-native'

const Screen = ({navigation, route})=>{

  return(
    <View>
      <Text onPress={()=>navigation.navigate('Home')}>Screen3 {route.params?.key}</Text>
    </View>
  )
}
export default Screen