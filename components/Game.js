import { Text, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function Game({props}) {

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <View style={styles.container}>
            {/* <Image source={{uri: `${ props['imageLink']}`}} style={styles.image}/> */}
            <Image
                source={imageError ? require('./../assets/placeholder.jpeg') : { uri : `${props['imageLink']}` }}
                style={styles.image}
                onError={handleImageError}
            />
            <Text style={styles.name}>Name: { props['name'] }</Text>
            <Text style={styles.text}>Rating: { props['rating']}</Text>
            <Text style={styles.text}>Publisher: { props['publisher']}</Text>
        </View>
    );
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 50,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
});