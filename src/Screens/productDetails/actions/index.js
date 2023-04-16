const getProduct = (putProduct, id)=>{
  return {
    variables:{
      id
    },
    skip: id === undefined,
    onCompleted: async (data)=>{
      //console.log('PRODUCT_DETAL', data)
      if(putProduct) await putProduct(data.getProduct)
    },
    onError: (err)=>{
      console.log('PRODUCT_DETAL', err)
    }
  }
}

export default {getProduct}