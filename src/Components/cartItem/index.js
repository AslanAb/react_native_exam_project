import { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image, ScrollView } from 'react-native'
import config from '../../Config'
import { constans, helpers } from '../../Services/utils'
import { storeCart } from '../../Services/store'

const windowWidth = Dimensions.get('window').width;

export default function ItemCartProduct({ item, navigation, setTotalPrice, deleteFn }) {
    //   const [catrtStatus, setCatrtStatus] = useState(false)
    //   const putInCart = async ()=>{
    //     if(!catrtStatus && !item.inCart){

    //       setCatrtStatus(true)
    //       await storeCart.set_cart_list(item)
    //     }
    //   }
    // const [product, setProduct] = useState(item)
    const [count, setCount] = useState(1)
    const [price, setPrice] = useState(+item.price)
    const inc = () => {
        setPrice(prev => prev += +item.price)
        setCount(prev => prev += 1)
        setTotalPrice(prev => prev = +prev + price)
    }
    const dec = () => {
        if (count === 1) {
            return
        }
        setPrice(prev => prev -= +item.price)
        setCount(prev => prev -= 1)
        setTotalPrice(prev => prev = +prev - price)
    }

    const dltFn = async () => {
        await storeCart.remove_cart_list(item)
        deleteFn()
    }

    // useEffect(() => {
    //     setTotalPrice(prev => prev = +prev + price)
    //   }, [])

    return (
        <View style={styles.itemContent}>
            <View style={styles.header}>
                <Image
                    resizeMode='cover'
                    style={styles.productImg}
                    source={{ uri: `${config.public}${item.picture}` }}
                />
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            </View>
            <Text style={styles.text2}>{item.category.title}</Text>
            <View style={styles.characteristics}><Text style={styles.text1}>Цвет:</Text><Text style={styles.text2}>{item.color}</Text></View>
            <View>
                <View>
                    <TouchableOpacity onPress={inc}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <Text>{count}</Text>
                    <TouchableOpacity onPress={dec}>
                        <Text>-</Text>
                    </TouchableOpacity>
                </View>
                <Text>{price.toFixed(1)}</Text>
            </View>
            <TouchableOpacity onPress={dltFn}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContent: {
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
        height: 300,
        width: '50%',
        borderRadius: 12
    },
    title: {
        fontSize: windowWidth * .04,
        fontWeight: 700,
        margin: 'auto',
        color: "#696969"
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