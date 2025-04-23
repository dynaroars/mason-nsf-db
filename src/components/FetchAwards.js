// components/FetchAwards.js
import Papa from 'papaparse';

export async function fetchAwardsData(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Process awards records (no grouping needed here)
          // This example returns an array of award objects
          const awards = results.data.map(row => ({
            AwardNumber: row.AwardNumber,
            Title: row.Title,
            PrincipalInvestigator: row.PrincipalInvestigator,
            StartDate: row.StartDate,
            EndDate: row.EndDate,
            AwardedAmountToDate: row.AwardedAmountToDate,
            CoPIName: row["Co-PIName(s)"], //
            Abstract: row.Abstract,
            award_link: row.award_link || '', // optional URL field, add if present
            // add any other fields you need here
          }));
          resolve(awards);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching awards data:', error);
    throw error;
  }
}