import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      {/* <a href="https://roars.dev" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
        <img src={logo} alt="dino" style={{ height: '100px', marginRight: '10px' }} />
      </a> */}
      <div>
        <div>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              margin: 0,
              fontWeight: '900',
              letterSpacing: 2,
              background: 'rgb(43, 182, 24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              // textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              userSelect: 'none',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              '@media (max-width:600px)': {
                fontSize: '1.8rem',
                letterSpacing: 1,
              },
            }}
          >
            George Mason University CEC NSF Awards
          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            component="div"
            sx={{ marginTop: 1, color: 'text.secondary', userSelect: 'text' }}
          >
            <Link href="https://git.roars.dev/mason-nsf-db" target="_blank" rel="noopener" underline="hover">
              git.roars.dev/mason-nsf-db
            </Link>
          </Typography>
        </div>
      </div>
    </header>
  );
}