import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        padding: 4,
        paddingVertical: 6,
        borderRadius: 5,
        borderColor: 'lightgrey',
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginStart: 4,
    }
})

export default styles