import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native'
import config from '../../Config'
import
MaterialCommunityIcons
    from 'react-native-vector-icons/MaterialCommunityIcons';
import { constans, helpers } from '../../Services/utils'

const windowWidth = Dimensions.get('window').width;

export default function ItemProductDetails({ item, navigation }) {
    console.log(item.characteristics)
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
            <Text style={styles.text1}>Характеристики</Text>
            <View>
                <Text style={styles.text2}>Особенности модели</Text>
                <Text style={styles.text2}>{item.title}</Text>
            </View>



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
        height: 200,
        width: '80%',
        borderRadius: 12
    },
    title: {
        fontSize: windowWidth * .04,
        fontWeight: 900,
        margin: 'auto'
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
    }
});