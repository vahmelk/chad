import React from 'react';
import { Modal, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import Data from './UserDet/Data'

export default class ModalEvent extends React.Component {

    render() {
        let textes = {
            waiting: 'Your Order Now Is In Process. Please Wait For Response.',
            accepted: 'Your Order Was Accepted.',
            declined: 'Your Order Was Declined.'
        },
            info = {
                day: this.props.selectedDay.slice(1, 11),
                events: Data.events.filter((el) => (el.start.indexOf(this.props.selectedDay.slice(1, 11)) > -1))
            };
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.props.setModalVisible(false)}>
                    <View style={styles.close}>
                        <View style={{ padding: 20 }}>
                            <Text style={styles.header}>Your Events {info.day}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.setModalVisible(false)}
                            style={{ padding: 20 }}
                            activeOpacity={.7}
                        >
                            <Icon name='close' color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.con}>
                        {
                            info.events.map(el => {
                                return (
                                    <View style={[{ backgroundColor: el.backgroundColor }, styles.row]}>
                                        <Text style={styles.miniHead}>Person: {el.firstName} {el.lastName}</Text>
                                        <Text style={styles.miniHead}>Hour: {el.start.slice(11)}</Text>
                                        <Text style={styles.txt}>{textes[el.groupId]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        padding: 20,
        borderTopColor: "black",
        borderTopWidth: 1
    },
    miniHead: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    con: {
        backgroundColor: "#212529",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start"
    },
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

