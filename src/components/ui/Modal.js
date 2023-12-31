import classes from './Model.module.css'

function Modal(props) {

    function cancelHandler(params) {
        props.onCancel();
    }

    function confirmHandler(params) {
        props.onConfirm();
    }


  return (
    <div className={classes.modal}>
      <p>Are you sure to delete?</p>
      <button className="btn btn-outline-light btn--alt mx-3 mb-3" onClick={cancelHandler} >
        Cancel
      </button>
      <button className="btn btn-outline-light btn--alt mb-3" onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
