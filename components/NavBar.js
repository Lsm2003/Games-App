import { Link } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function NavBar() {
    return (
        <View style={styles.navBar}>
            <Link href={'/'} asChild>
                <Pressable style={styles.button}>
                    <FontAwesomeIcon icon="fa-house" size={20} style={styles.icon}/>
                    <Text style={styles.text}>Home</Text>
                </Pressable>
            </Link>
            <Link href={'/update'} asChild>
                <Pressable style={styles.button}>
                    <FontAwesomeIcon icon="fa-pen-to-square" size={20} style={styles.icon}/>
                    <Text style={styles.text}>Edit</Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'darkgray',
        paddingVertical: 8,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    icon: {
        color: 'white',
        marginRight: 5,
    },
});