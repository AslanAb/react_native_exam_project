import { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import {
  useQuery,
} from '@apollo/client';
import { productsGQL } from '../../Services/gqls';
import actionProducts from './actions'
import config from '../../Config'

import { AntDesign } from '@expo/vector-icons'

const windowWidth = Dimensions.get('window').width;

const ProductDetails = ({ route }) => {
  const [productData, setProducData] = useState(route.params?.item);
  const putProduct = (data) => {
    setProducData(data.product)
  }

  useQuery(productsGQL.getProduct, actionProducts.getProduct(putProduct, route.params?.item?._id))

  return (
    <View style={styles.itemContent}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            resizeMode='cover'
            style={styles.productImg}
            source={{ uri: `${config.public}${productData.picture}` }}
          />
          <Text style={styles.title} numberOfLines={2}>{productData.title}</Text>
        </View>
        <Text style={styles.title1}>Характеристики:</Text>
        <FlatList
          data={productData.addition_product?.characteristics}
          numColumns={1}
          horizontal={false}
          renderItem={({ item }) => <View style={styles.characteristics}><Text style={styles.text1}>{item.name}:</Text><Text style={styles.text2}>{item.value}</Text></View>}
          keyExtractor={item => productData.addition_product?.characteristics.indexOf(item)}
        />
        <Text style={styles.title1}>Описание:</Text>
        <Text style={styles.text2}>{productData.description}</Text>
        <View style={styles.characteristics}><Text style={styles.text3}>Цвет:</Text><Text style={styles.text2}>{productData.color}</Text></View>
        <View style={styles.characteristics}><Text style={styles.text3}>Категория:</Text><Text style={styles.text2}>{productData.category.title}</Text></View>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={{marginRight: 5}}>В избранное</Text>
            <AntDesign
              name={'heart'}
              size={23}
              color={'black'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContent: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  itemFooter: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  productImg: {
    height: 400,
    width: '90%',
    borderRadius: 12
  },
  title: {
    fontSize: windowWidth * .05,
    fontWeight: 900,
    margin: 'auto'
  },
  title1: {
    fontSize: windowWidth * .04,
    fontWeight: 900,
    color: "black",
    borderBottomColor: '#696969',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  characteristics: {
    flexDirection: 'row',
    alignItems: "end"
  },
  text1: {
    fontWeight: 700,
    marginRight: 5,
    color: "#696969"
  },
  text2: {
    color: "#696969",
  },
  text3: {
    fontSize: windowWidth * .04,
    fontWeight: 700,
    marginRight: 5
  },
  btn: {
    flexDirection: 'row',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 6,
    width: 'fit-content',
    padding: 6,
    alignItems: 'center',
    margin: 'auto'
  }

});

export default ProductDetails