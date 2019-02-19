import React, { Component } from "react";
import Image from "./Image";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export default class Images extends Component {
  state = {
    start: 1,
    count: 30,
    photos: []
  };
  componentDidMount() {
      this.fetchData();
  }
  fetchData = () => {
    let { start, count } = this.state;
    console.log(start);
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res => {
        console.log('res', res);
        this.setState({ photos: [...this.state.photos, ...res.data], start: this.state.start + count })
      });
  };
  render() {
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={this.state.photos.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={true}
          loader={
            <img
              src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
              alt="loading"
            />
          }
        >
          {this.state.photos.map((image, idx) => {
            return <Image src={image} key={`${image.id}_${idx}`} />;
          })}
        </InfiniteScroll>
      </div>
    );
  }
}
