import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

class Score extends React.Component {
  constructor(props) {
    super(props);
    const { player } = this.props;
    this.state = {
      open: false,
      name: player.name,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleValidateNewName = () => {
    const { handleUpdatePlayerName, player } = this.props;
    const { name } = this.state;
    handleUpdatePlayerName(player.id, name);
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { player, points } = this.props;
    const { open } = this.state;
    // Properly extract first character (handles emojis correctly)
    const firstChar = Array.from(player.name)[0] || player.name;
    return (
      <Grid item xs={3} sm={2} md={1}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar onClick={this.handleClickOpen}>
            {firstChar}
          </StyledAvatar>
          <Typography variant="body1">{points}</Typography>
          <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update player name</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="newName"
                label="New Name"
                fullWidth
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleValidateNewName} color="primary">
                Validate
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

Score.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.number.isRequired,
  handleUpdatePlayerName: PropTypes.func.isRequired,
};

export default Score;
