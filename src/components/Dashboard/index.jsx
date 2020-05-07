import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Spinner } from 'reactstrap';
import PropTypes from "prop-types";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { fetchCurrentLeasesList } from '../../actions/leaseActions';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

class Dashboard extends PureComponent {
  componentDidMount() {
    const { fetchCurrentLeasesList } = this.props;
    fetchCurrentLeasesList();
  }

  render() {
    const { currentLeasesList, isFetchingCurrentLeases } = this.props;
    let leasesContent;

    if (isFetchingCurrentLeases) {
      leasesContent = (
        <div className="pl-spinner">
          <Spinner color="primary" />
        </div>
      );
    } else {
      leasesContent = currentLeasesList && currentLeasesList.length > 0
      ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Lease Id</th>
              <th>Tenant Name</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {currentLeasesList.map((lease, i) => (
              <tr key={lease.id}>
                <th scope="row">{i+1}</th>
                <td>{lease.id}</td>
                <td>{lease.tenant}</td>
                <td className="pl-view-details-icon"><VisibilityOutlinedIcon /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) 
      : <p className="pl-no-leases">No Current Leases Found</p>
    }

    return (
      <>
        <Navbar />
        <div className="container pl-lease-container">
          <h3 className="pl-leases-heading">Current Leases List</h3>
          {leasesContent}
        </div>
        <Footer />
      </>
    );
  }
}

Dashboard.propTypes = {
  fetchCurrentLeasesList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentLeasesList: state.lease.currentLeasesList,
  isFetchingCurrentLeases: state.lease.isFetchingCurrentLeases,
});

export default connect(mapStateToProps, { fetchCurrentLeasesList })(Dashboard);
