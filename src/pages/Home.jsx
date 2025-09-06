import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F2F4F7',
        px: 4,
        py: 8,
      }}
    >
      <Box sx={{ maxWidth: 600, mr: 8 }}>
        <Typography variant="h2" component="h1" fontWeight={700} mb={3} color="#101828">
          Camper rentals for your perfect road trip
        </Typography>
        <Typography variant="h6" color="#475467" mb={5}>
          Choose and book a camper for your next adventure. Explore the world with comfort and freedom.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => navigate('/catalog')}
          sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 2, fontSize: 18 }}
        >
          View Now
        </Button>
      </Box>
      <Box sx={{ minWidth: 320, maxWidth: 400 }}>
        <img
          src="https://via.placeholder.com/400x300?text=Camper+Banner"
          alt="Camper banner"
          style={{ width: '100%', borderRadius: 24, boxShadow: '0 8px 32px rgba(16,24,40,0.12)' }}
        />
      </Box>
    </Box>
  );
}