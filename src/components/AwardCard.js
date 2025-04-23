import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const StyledLink = styled(Link)({
  color: 'darkblue',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const AwardCard = ({ award }) => {
  const [abstractExpanded, setAbstractExpanded] = useState(false);

  const toggleAbstract = () => setAbstractExpanded(prev => !prev);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const cleanAmount = (amt) => amt.endsWith('.00') ? amt.slice(0, -3) : amt;

  const renderAbstract = (text) =>
    text.split(/<br\s*\/?>/gi).map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '5px',
        padding: 2,
        marginBottom: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          <StyledLink href={award.award_link || '#'} target="_blank" rel="noopener noreferrer">
            {award.Title}
          </StyledLink>
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" component="div">
            Principal Investigator:{' '}
            <Box component="span" fontWeight="bold" color="error.main">
              {award.PrincipalInvestigator}
            </Box>
          </Typography>
          {award.CoPINames && (
            <Typography variant="subtitle1" component="div">
              Co-PI(s):{' '}
              <Box component="span" fontWeight="bold" color="error.main">
                {award.CoPINames}
              </Box>
            </Typography>
          )}
        </Box>


        <Typography variant="subtitle1" component="div">
            Program Manager:{' '}
            <Box component="span" fontWeight="bold" >
              {award.ProgramManager}
            </Box>
          </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>NSF Organization:</strong> {award.NSFOrganization}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Date:</strong> {formatDate(award.StartDate)} - {formatDate(award.EndDate)}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Award Amount:</strong>{' '}
          {`${cleanAmount(award.AwardedAmountToDate)}`}
        </Typography>
      </CardContent>

      <CardContent sx={{ paddingTop: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
          onClick={toggleAbstract}
          aria-expanded={abstractExpanded}
          aria-label="Toggle abstract"
        >
          Abstract {abstractExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={abstractExpanded} timeout="auto" unmountOnExit>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {renderAbstract(award.Abstract)}
        </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AwardCard;