import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Spinner } from 'reactstrap';
import PropTypes from "prop-types";
import { fetchCurrentLeasesList, fetchSelectedLeaseByLeaseId } from '../../actions/leaseActions';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import LeaseModal from '../LeaseModal';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedLeaseId: '',
    }
  }

  componentDidMount() {
    const { fetchCurrentLeasesList } = this.props;
    fetchCurrentLeasesList();
  }

  /**
   * Toggle the visibility state of the lease modal
   */
  toggleModal = (e) => {
    const { isModalOpen } = this.state;
    const { fetchSelectedLeaseByLeaseId } = this.props;

    if (Object.keys(e.target.dataset).length) {
      fetchSelectedLeaseByLeaseId(e.target.dataset.leaseId);
    }

    this.setState({ isModalOpen: !isModalOpen });
  }

  render() {
    const {
      currentLeasesList,
      isFetchingCurrentLeases,
      currentLeasesFetchError,
    } = this.props;

    const { isModalOpen } = this.state;

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
                <td className="pl-view-details-icon" >
                  <i className="fa fa-eye" onClick={this.toggleModal} data-lease-id={lease.id}></i>
                </td>
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
          {!isFetchingCurrentLeases && currentLeasesFetchError
            ? <p className="pl-leases-error">Could not retrieve current leases list. Please try again later.</p>
            : leasesContent}
        </div>
        <Footer />
        {isModalOpen ? <LeaseModal modal={isModalOpen} toggle={this.toggleModal} /> : ''}
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
  currentLeasesFetchError: state.lease.currentLeasesFetchError,
});

export default connect(mapStateToProps, { fetchCurrentLeasesList, fetchSelectedLeaseByLeaseId })(Dashboard);
