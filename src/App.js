import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { fetchAwardsData } from './components/FetchAwards';
import AwardCard from './components/AwardCard';
import Header from './components/Header';

export default function App() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAwardsData('/mason-nsf-db/data/mason-nsf-awards.csv');
        setAwards(data);
      } catch (error) {
        console.error('Failed to load awards data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const matchesSearch = (award, query) => {
    if (!query) return true; // no filter if empty query
  
    const lowerQuery = query.toLowerCase();
    
    // Concatenate all searchable string fields (skip null/undefined)
    const searchable = [
      award.AwardNumber,
      award.Title,
      award.PrincipalInvestigator,
      award.CoPINames,
      award.Programs,
      award.Abstract,
      award.NSFOrganization,
      award.ProgramManager,
      award.StartDate,
      award.EndDate,
      award.AwardedAmountToDate,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
  
    return searchable.includes(lowerQuery);
  };

  // Filter awards by selected PIs and search text (select all PIs here since no sidebar)
  const filteredAwards = awards.filter(award => {
    // Apply your PI selection filter here if needed
    return matchesSearch(award, searchText);
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ padding: 3, flexGrow: 1, overflowY: 'auto' }}>
        <TextField
          label="Search for anything"
          variant="outlined"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 3 }}
        />
        {loading && <Typography>Loading Awards...</Typography>}
        {!loading && filteredAwards.length === 0 && (
          <Typography>No awards found matching filters.</Typography>
        )}
        {!loading && filteredAwards.map(award => (
          <AwardCard key={award.AwardNumber || award.Title} award={award} />
        ))}
      </Box>
    </Box>
  );
}