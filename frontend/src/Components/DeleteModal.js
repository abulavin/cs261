import React, { Component } from "react";
import {DeleteTradeProxy} from "../BackendProxy";

class DeleteModal extends Component {
  state = { 
      show: false 
  };

  constructor(props) {
    super(props);
    this.deleteProxy = new DeleteTradeProxy();
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    window.location.reload();
  };

  deleteTrade = () => {
    console.log("delete "+this.props.id)
    this.deleteProxy.deleteTrade(this.props.id)
  }

  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Reason for deletion?</p>
    
          <button onClick={this.deleteTrade}> Delete this trade</button>
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