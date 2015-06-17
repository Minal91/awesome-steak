/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS} = React;
var PropertyFinderApp = React.createClass({
  getInitialState: function() {
    return {result: 'gaurish knows little of react'}
  },
  login: function(){
    FacebookLoginManager.newSession((error, info) => {
      if (error){
        this.setState({result: error});
      } else {
        var responseText = getFacebookUser(info);
          this.setState({result: responseText});
      }
    });
  },

  render: function(){
    return (

      <View style={styles.container}>
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.welcome}>
            Facebook Login(Click on me to Start)
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    )
  }
});


function getFacebookUser(fbObject){
    var my_id = fbObject.userId;
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://graph.facebook.com/778117759?access_token=CAAD8RCrI65wBAMI0YQQmZAKqO8P4BF1vD51XN72qNrkWOJtUFvYmhT63JRM3lyJ5ZCbn3cOfKk9Sv2wsx2K2JGom9te3YNXSbOpgmZAZAhPpkXeDoM3Bb2HwMK2WTJOCh5sGz6VgBa1INGyFZBYY7qC2gW74lRMCQZCR3ZCXBCaapOvIzwOpovfZB5u7F5f7h73o5kZBWug8MW5NLemGj0JtWXkWo9PpXlpbRZCNqAaBXEkCeFtqn9vlxeenmC13CEBZBQZD', true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            alert(xhr.responseText);
            if (xhr.status === 200) {
                alert(xhr.responseText);
                return(xhr.responseText);
            } else {
                return(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        return(xhr.statusText);
    };
    xhr.send(null);
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('PropertyFinder',() => PropertyFinderApp);
