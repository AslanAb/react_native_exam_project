import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { 
  useQuery,
  useLazyQuery
} from '@apollo/client';
import { productsGQL } from '../../Services/gqls';
import {getProducts} from './actions'
import {ProductItem} from '../../Components'

const Products = ({navigation})=>{
  const [products, setProducts] = useState([])

  useQuery(productsGQL.getProducts, getProducts(setProducts));
  return(
    <FlatList
      data={products}
      numColumns={2}
      columnWrapperStyle={styles.listWraper}
      horizontal={false}
      renderItem={({item}) => <ProductItem item={item} navigation={navigation} />}
      keyExtractor={item => item._id}
    />
  )
}

const styles = StyleSheet.create({
  listWraper: {
    gap: 10, 
    backgroundColor: '#fff',
    paddingVertical: 5, 
    paddingHorizontal: 10
  },
});
export default Products