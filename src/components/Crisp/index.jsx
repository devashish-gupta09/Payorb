import React from "react";

class Crisp extends React.Component {
  componentDidMount() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "f365a1a1-a585-46b3-a922-926ba29eb945";
    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }

  render() {
    return null;
  }
}
export default Crisp;
