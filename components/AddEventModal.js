import React from 'react';
import { KeyboardAvoidingView, Modal, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import Data from './UserDet/Data'
import DetMod from './DetMod'
import PhoneInput from 'react-native-phone-input'

export default class AddEventModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Vazgen',
            sname: 'Xzaryan',
            number: '77564502',
            message: '',
            showNumModal: false,
            countryCode: Data.countryCode,
            b1: 'black',
            b2: 'black',
            b3: 'black'
        }
        this.successfulyAdded = this.successfulyAdded.bind(this);
        this.verif = this.verif.bind(this);
    }

    successfulyAdded() {
        this.setState({
            showNumModal: false,
            name: '',
            sname: '',
            number: '',
            message: '',
        });
        this.props.setAddEventModalVisible(false);
    }

    verif() {
        this.setState({
            showNumModal: this.state.name && this.state.sname && (Data.countryCode + this.state.number).length == 12,
            b1: (!this.state.name ? "red" : "black"),
            b2: (!this.state.sname ? "red" : "black"),
            b3: ((Data.countryCode + this.state.number).length != 12 ? "red" : "black")
        });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.props.setAddEventModalVisible(false)}
                >
                    <View style={styles.close}>
                        <View style={{ padding: 20 }}>
                            <Text style={styles.header}>Booking</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.setAddEventModalVisible(false);
                            }}
                            style={{ padding: 20 }}
                            activeOpacity={.7}
                        >
                            <Icon name='close' color="white" />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 1, padding: 10 }} behavior="height">
                        <ScrollView>

                            <Text
                                style={styles.txt}
                                onPress={() => this.refs.name.focus()}
                            >
                                Name
                            <Text style={{ color: "red" }}>&nbsp;*</Text>
                            </Text>
                            <TextInput
                                // autoFocus={true}
                                onChangeText={txt => this.setState({ name: txt })}
                                value={this.state.name}
                                style={[styles.inp, { borderColor: this.state.b1 }]}
                                onSubmitEditing={() => this.refs.sname.focus()}
                                ref='name'
                            />
                            <Text
                                style={styles.txt}
                                onPress={() => this.refs.sname.focus()}
                            >
                                Surname
                            <Text style={{ color: "red" }}>&nbsp;*</Text>
                            </Text>
                            <TextInput
                                onChangeText={txt => this.setState({ sname: txt })}
                                value={this.state.sname}
                                style={[styles.inp, { borderColor: this.state.b2 }]}
                                onSubmitEditing={() => this.refs.number.focus()}
                                ref='sname'
                            />
                            <Text
                                style={styles.txt}
                                onPress={() => this.refs.number.focus()}
                            >
                                Phone Number
                            <Text style={{ color: "red" }}>&nbsp;*</Text>
                            </Text>
                            <PhoneInput
                                ref='number'
                                value={this.state.countryCode + this.state.number}
                                onChangePhoneNumber={(num) => {
                                    if (num.length >= Data.countryCode.length) {
                                        this.setState({ number: num.toString().slice(Data.countryCode.length) })
                                    }
                                    else {
                                        this.setState({ countryCode: num })
                                        setTimeout(() => {
                                            this.setState({ countryCode: Data.countryCode })
                                        }, 10);
                                    }
                                }}
                                onPressFlag={() => { }}
                                onSubmitEditing={() => this.refs.message.focus()}
                                style={[styles.inp, { borderColor: this.state.b3 }]}
                            />
                            <Text style={styles.txt}>
                                Message (max 255)
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={1}
                                maxLength={255}
                                onChangeText={txt => this.setState({ message: txt })}
                                value={this.state.message}
                                style={styles.textarea}
                                ref='message'
                            />
                            <Text style={styles.txt}>Day: {this.props.selectedDay.slice(1, 11)}</Text>
                            <Text style={[styles.txt, { paddingBottom: 20 }]}>Time: {this.props.time}</Text>

                        </ScrollView>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={styles.submit}
                        onPress={this.verif}
                    >
                        <Text style={styles.submitTxt}>Submit</Text>
                    </TouchableOpacity>
                    <DetMod
                        show={this.state.showNumModal}
                        hide={() => this.setState({ showNumModal: false })}
                        hideFull={this.successfulyAdded}
                        name={this.state.name}
                        sname={this.state.sname}
                        number={'(' + this.state.countryCode + ') ' + this.state.number}
                        message={this.state.message.replace(/\n/g, " ")}
                        time={this.props.time}
                        day={this.props.selectedDay.slice(1, 11)}
                    />

                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    submitTxt: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    submit: {
        width: "100%",
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 15,
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
    },
    inp: {
        height: 36,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        marginBottom: 10
    },
    txt: {
        paddingBottom: 7,
        fontSize: 16
    },
    textarea: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderRadius: 15,
        borderColor: "black",
        marginBottom: 10,
        fontSize: 16,
        maxHeight: 150,
    }
});