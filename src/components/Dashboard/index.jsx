import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentLeasesList } from '../../actions/leaseActions';

class Dashboard extends PureComponent {
  componentDidMount() {
    const { fetchCurrentLeasesList } = this.props;
    fetchCurrentLeasesList();
  }

  render() {
    return (
      <h1>Dashboard</h1>
    );
  }
}

export default connect(null, { fetchCurrentLeasesList })(Dashboard);