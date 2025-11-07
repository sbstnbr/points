import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classnames from 'classnames';
import Round from './Round';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  padding: '0 0 6px 0',
}));

const StyledCardActions = styled(CardActions)({
  padding: '0px',
});

const getSteps = () => ['Bid', 'Result'];

const WistRound = ({
  activeStep, handleSwitchActiveStep, children,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const steps = getSteps();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Round>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-evenly">
          {children}
        </Grid>
      </CardContent>
      <StyledCardActions disableSpacing>
        <StyledIconButton
          expanded={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </StyledIconButton>
      </StyledCardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleSwitchActiveStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Collapse>
    </Round>
  );
};

export default WistRound;
