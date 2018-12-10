import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';

const ConfirmDelete = (props) => {
  return <Dialog
    open={props.open}
    onClose={props.onClose}
  >
    <DialogContent>
      <DialogContentText>
        Kas sa oled kindel, et tahad {props.object} kustutada?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Tagasi
      </Button>
      <Button onClick={props.onContinue} color="secondary">
        Kustuta
      </Button>
    </DialogActions>
  </Dialog>;
};

ConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  object: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};


export default ConfirmDelete;
