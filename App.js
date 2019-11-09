import React from 'react'
import { StyleSheet, View } from 'react-native'
import Data from './components/UserDet/Data'
import Header from './components/Header'
import Calendar from './components/Calendar'
import BottomDetail from './components/BottomDetail'
import BookedEvents from './components/BookedEvents'
import moment from 'moment'
import ModalEvent from './components/ModalEvent'
import MessageModal from './components/MessageModal'
import AddEventModal from './components/AddEventModal'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: JSON.stringify(moment()),
      modalVisible: false,
      messageModalVisible: false,
      addEventModalVisible: false,
      addEventTime: '',
      modalEventData: null
    }
  }

  render() {
    return (
      <View style={styles.con}>
        <View style={styles.head}></View>
        <Header
          setMessageModalVisible={to => this.setState({ messageModalVisible: to })}
        />
        <Calendar parentCallback={day => this.setState({ selectedDay: day })} />
        <BookedEvents
          setModalVisible={to => this.setState({ modalVisible: to })}
          selectedDay={this.state.selectedDay}
        />
        <BottomDetail
          selectedDay={this.state.selectedDay}
          setAddEventModalVisible={(to, time) => this.setState({ addEventTime: time, addEventModalVisible: to })}
        />
        <ModalEvent
          setModalVisible={to => this.setState({ modalVisible: to })}
          modalVisible={this.state.modalVisible}
          selectedDay={this.state.selectedDay}
        />
        <MessageModal
          setMessageModalVisible={to => this.setState({ messageModalVisible: to })}
          modalVisible={this.state.messageModalVisible}
        />
        <AddEventModal
          setAddEventModalVisible={to => this.setState({ addEventModalVisible: to })}
          modalVisible={this.state.addEventModalVisible}
          selectedDay={this.state.selectedDay}
          time={this.state.addEventTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    height: 33,
    backgroundColor: Data.headerColor
  },
  con: {
    flex: 1,
    backgroundColor: Data.headerColor
  }
});
