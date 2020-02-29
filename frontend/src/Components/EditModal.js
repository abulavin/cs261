import React, { Component } from "react";
import moment from 'moment';

class EditModal extends Component {
  state = { 
      show: false 
    };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  checkEditable = () => {
    var limit = new Date();
    limit.setDate(limit.getDate()-7);
    limit = moment(limit).format('MM/DD/YYYY hh:mm:ss')
    console.log("limit "+limit);
    // var d = new Date(2020, 04, 20);
    var d = moment(this.props.date).format('MM/DD/YYYY hh:mm:ss');
    console.log("date trade "+d);

    if (d > limit) {
      return true
    }
    else {
      return false
    }
  }



  render() {
    // if current date is equal to or greater than the creation date + 7 then return modal with error message
    if (!this.checkEditable()) return (
      <main>
        <button type="button" onClick={this.showModal}>
          Edit Trade
        </button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1>ERROR NOT EDITABLE</h1>
        </Modal>
      </main>
    )
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Data</p>
        </Modal>
        <button type="button" onClick={this.showModal}>
          Edit Trade
        </button>
      </main>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default EditModal;