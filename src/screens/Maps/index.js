import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableHighlight } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerLocation: { latitude: 52.520008, longitude: 13.404954 }
    };
  }
  viewVideos = () => {
    const { markerLocation } = this.state;
    this.props.navigation.navigate("Videos", { markerLocation });
  };
  render() {
    const { markerLocation } = this.state;

    return (
      <MapView
        initialRegion={{
          latitude: 52.520008,
          longitude: 13.404954,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.map}
        showsUserLocation={true}
      >
        <Marker
          draggable
          coordinate={markerLocation}
          onPress={() => this.viewVideos()}
          onDragEnd={e =>
            this.setState({ markerLocation: e.nativeEvent.coordinate })
          }
        >
          <Callout tooltip style={styles.customView}>
            <TouchableHighlight underlayColor="#dddddd">
              <View />
            </TouchableHighlight>
          </Callout>
        </Marker>
      </MapView>
    );
  }
}
export default Maps;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  SearchBar: {
    backgroundColor: "white",
    height: 30,
    margin: 20,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  }
});
