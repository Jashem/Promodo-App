import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'
import {Constants} from 'expo'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 24,
      sec: 59,
      flag: false,
      text: 'Work Timer',
      pause: false,
      buttonText: 'Pause',
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.changeTime, 1000)
  }

  changeTime = () => {
    if(this.state.min === 0 && this.state.sec === 0) {
      vibrate()
      this.toggleTimer()
    }
    else {
      this.setState(prevState => ({
        sec: prevState.sec - 1,
      }))
  
      if(this.state.sec === -1) {
        this.setState(prevState => ({
          min: prevState.min - 1,
          sec: 59,
        }))
      }
    }
  }

  toggleTimer = () => {
    if(this.state.flag) {
      this.setState(prevState => ({
        min: 24,
        sec: 59,
        flag: !prevState.flag,
        text: 'Work Timer',
      }))
    }
    else {
      this.setState(prevState => ({
        min: 24,
        sec: 59,
        flag: !prevState.flag,
        text: "Break Timer",
      }))
    }
  }

  togglePause = () => {
    if(!this.state.pause) {
      clearInterval(this.interval)
      this.setState(prevState => ({
        pause: !prevState.pause,
        buttonText: 'Start',
      }))
    }
    else {
      this.interval = setInterval(this.changeTime, 1000)
      this.setState(prevState => ({
        pause: !prevState.pause,
        buttonText: 'Pause',
      }))
    }
  }

  reset = () => {
    clearInterval(this.interval)
    this.setState({
      min: 24,
      sec: 59,
      flag: false,
      text: 'Work Timer',
      pause: true,
      buttonText: 'Start',
    })
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.font}>{this.state.text}</Text>
        <Text style = {styles.font}>{this.state.min}:{this.state.sec}</Text>
        <View style = {styles.button}> 
          <Button title={this.state.buttonText} onPress={this.togglePause}/>
          <Button title="Reset" onPress={this.reset}/>
        </View>
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Timer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  font: {
    fontWeight: 'bold',
    fontSize: 48,
  },
  button: {
    flexDirection: 'row',
  },
});
