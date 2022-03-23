import React from "react";
import { Watch } from "react-loader-spinner";

class Loader extends React.Component {
  render() {
    return (
      <Watch
        color="#00BFFF"
        height={80}
        width={80}
        margin="0 auto"
        display="block"
      />
    );
  }
}

export default Loader;
