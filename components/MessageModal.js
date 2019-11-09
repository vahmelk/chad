import React from 'react';
import { Modal, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import Data from './UserDet/Data'

export default class MessageModal extends React.Component {

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.props.setMessageModalVisible(false)}>
                    <View style={styles.close}>
                        <View style={{ padding: 20 }}>
                            <Text style={styles.header}>Chat with {Data.name}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.setMessageModalVisible(false)}
                            style={{ padding: 20 }}
                            activeOpacity={.7}
                        >
                            <Icon name='close' color="white" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    close: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Data.headerColor
    },
    header: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
});

