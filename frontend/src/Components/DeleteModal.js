import React, { Component } from "react";

class DeleteModal extends Component {
  state = { 
      show: false 
    };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Reason for deletion?</p>
          <p>Data</p>
        </Modal>
        <button type="button" onClick={this.showModal}>
          Delete Trade
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

export default DeleteModal;