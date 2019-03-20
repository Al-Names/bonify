import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import moment from "moment";

import styles from "./styles";

export default class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],

      location: {
        longitude: this.props.navigation.state.params.markerLocation.longitude,
        latitude: this.props.navigation.state.params.markerLocation.latitude,
        country: "",
        code: ""
      }
    };
  }

  componentDidMount() {
    const { longitude, latitude } = this.state.location;
    return fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&result_type=country&key=AIzaSyC1hR1YSp-_uik_GvAV5oLtUym7GNZ-r1A"
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            location: {
              ...this.state.location,
              country: responseJson.results[0].formatted_address,
              code: responseJson.results[0].address_components.find(elem =>
                elem.types.includes("country")
              ).short_name
            }
          },
          function() {}
        );
        return fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC1hR1YSp-_uik_GvAV5oLtUym7GNZ-r1A&chart=mostPopular&regionCode=${
            this.state.location.code
          }&part=snippet&maxResults=10`
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            this.setState({
              isLoading: false,
              dataSource: responseJson.items
            });
          })

          .catch(error => {
            console.error(error);
          });
      });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => this.openVideo(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 120, width: 90 }}
          source={{
            uri: item.snippet.thumbnails.medium.url
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          {item.snippet.title}
        </Text>
        <Text
          style={styles.descriptionText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.snippet.description}
        </Text>
        <View>
          <Text style={styles.smallText}>{item.snippet.channelTitle}</Text>
          <Text style={styles.smallText}>
            {moment(item.snippet.publishedAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  openVideo = id => {
    const url = `https://www.youtube.com/watch?v=${id}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          this.showAlert(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        this.showAlert(`An error occurred while trying to open ${url}`);
      });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text> {this.state.location.city}</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <Text style={styles.heading}>{this.state.location.country}</Text>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, i) => i}
          />
        </View>
      );
    }
  }
}
