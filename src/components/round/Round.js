import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)({
  width: '100%',
});

const Round = ({ children }) => (
  <StyledGrid item xs={12}>
    <Card elevation={10}>{children}</Card>
  </StyledGrid>
);

Round.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Round;
