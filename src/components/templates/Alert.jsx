import React from "react";

class Alert extends React.Component {

  constructor(props){
      super(props)
      this.state = {
          showAlert:true
      }
  }


  onCloseAlert = () => {
      this.setState({
          showAlert:!this.state.showAlert
      })
  }


  render() {
    return (
      <React.Fragment>
        <br />
        { this.props.success && this.state.showAlert && (
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <i class="fa fa-check-circle"></i>
            <span>
              <strong>{ this.props.mensagem }</strong>
            </span>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onCloseAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )} 

        { this.props.error && this.state.showAlert && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <i class="fa fa-check-circle"></i>
            <span>
                <strong>{ this.props.mensagem }</strong>
            </span>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onCloseAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        { this.props.warning && this.state.showAlert && (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <i class="fa fa-check-circle"></i>
            <span>
            <strong>{ this.props.mensagem }</strong>
            </span>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onCloseAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        { this.props.info && this.state.showAlert && (
          <div
            class="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <i class="fa fa-check-circle"></i>
            <span>
            <strong>{ this.props.mensagem }</strong>
            </span>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onCloseAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Alert;
