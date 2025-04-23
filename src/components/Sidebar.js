import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Sidebar({ principalInvestigators, selectedPIs, onTogglePI, searchText, onSearchChange }) {
  return (
    <Box sx={{ padding: 2, width: 280, boxSizing: 'border-box' }}>
      <TextField
        label="Search PI"
        variant="outlined"
        value={searchText}
        onChange={onSearchChange}
        fullWidth
        size="small"
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {principalInvestigators.length === 0 && (
          <p style={{ color: '#999' }}>No Principal Investigators found.</p>
        )}
        {principalInvestigators.map(pi => (
          <FormControlLabel
            key={pi}
            control={
              <Checkbox
                checked={selectedPIs.has(pi)}
                onChange={() => onTogglePI(pi)}
                size="small"
              />
            }
            label={pi}
          />
        ))}
      </Box>
    </Box>
  );
}