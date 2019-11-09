import React from 'react';
import Data from './UserDet/Data';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Header extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.headerLogoIcon}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./UserDet/images/logo.png')}
                        />
                    </View>
                    <Text style={styles.headerText}>{Data.name}</Text>
                    <View style={styles.headerLogoIcon}>
                        <TouchableOpacity onPress={() => this.props.setMessageModalVisible(true)}>
                            <Icon name='message' color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: Data.headerColor,
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    headerText: {
        color: Data.headerTextColor,
        fontSize: 20,
        fontWeight: "bold"
    },
    headerLogoIcon: {
        width: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
});
