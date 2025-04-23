import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// import Graph from './Graph';
import AwardCard from './AwardCard';

function AwardDisplay({ filteredAwards }) {
  // State to track current view: 'list' or 'graph'
  const [viewMode, setViewMode] = useState('list'); // default is list

  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Dropdown selector */}
      <FormControl sx={{ minWidth: 150, marginBottom: 2 }} size="small">
        <InputLabel id="view-select-label">View</InputLabel>
        <Select
            labelId="view-select-label"
            id="view-select"
            value={viewMode}
            label="View"
            onChange={handleViewChange}
        >
            <MenuItem value="list">List View</MenuItem>
            <MenuItem value="graph">Graph View</MenuItem>
        </Select>
      </FormControl>

      {/* Conditionally render based on view */}
      {/* {viewMode === 'graph' && (
        <div style={{ width: '90%', marginBottom: 16 }}>
          <Graph Awards={filteredAwards} />
        </div>
      )} */}

      {viewMode === 'list' && (
        <div style={{ width: '100%' }}>
          {filteredAwards.map(conf => (
            <AwardCard
              key={`${conf.name}-${conf.year}`}
              Award={conf}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AwardDisplay;