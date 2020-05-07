import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table } from 'reactstrap';

const LeaseModal = ({
  modal,toggle, selectedLease, isFetchingSelectedLease, selectedLeaseFetchError,
}) => {
  let modalContent;
  // Display an error message if fetching the selected lease fails
  if (!isFetchingSelectedLease && selectedLeaseFetchError) {
    modalContent = (
      <p className="pl-leases-error">
        Could not retrieve the selected lease. Please try again later.
      </p>
    );
  // Display a loader if the data is being fetched
  } else if (isFetchingSelectedLease) {
    modalContent = (
      <div className="pl-spinner">
        <Spinner color="primary" />
      </div>
    );
  // Display the fetched data on success
  } else {
    modalContent = (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </Table>
    );
  }

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" backdrop>
      <ModalHeader toggle={toggle}>
        Lease: <b>{selectedLease ? selectedLease.id : ''}</b>
      </ModalHeader>
      <ModalBody>
        {modalContent}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>OK</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => ({
  selectedLease: state.lease.selectedLease,
  isFetchingSelectedLease: state.lease.isFetchingSelectedLease,
  selectedLeaseFetchError: state.lease.selectedLeaseFetchError,
});

export default connect(mapStateToProps)(React.memo(LeaseModal));