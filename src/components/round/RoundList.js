import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

const RoundList = ({ children }) => (
  <Grid item container direction="column" alignItems="center" spacing={2}>
    {children}
  </Grid>
);

RoundList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RoundList;
