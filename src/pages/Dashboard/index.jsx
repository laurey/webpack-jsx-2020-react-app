import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const {
      match: { url },
    } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
        <Link to={`${url}/monitor`} />
        <br />
        <Link to={`${url}/center`} />
      </div>
    );
  }
}

export default Dashboard;
