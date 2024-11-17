import { Search } from '@mui/icons-material';
import { Box, Container, TextField, Typography } from '@mui/material';

export function HomeScreen() {
  return (
    <Box py={7} bgcolor={'#d1d1d1'}>
      <Container maxWidth="sm">
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <Typography fontWeight={900} fontSize={26} mr={4}>
                  Olá.
                </Typography>
              ),
              endAdornment: (
                <Search
                  sx={{
                    fontSize: 42,
                    cursor: 'pointer',
                  }}
                >
                  Olá.
                </Search>
              ),
            },
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            border: 'none',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
          }}
          placeholder="O que você está procurando?"
          variant="outlined"
          fullWidth
        />
      </Container>
    </Box>
  );
}
