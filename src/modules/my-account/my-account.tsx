'use client';
import { ArrowForwardIos, House } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const MyAccountScreen = () => {
  const [value, setValue] = useState(0);
  console.log(value);
  return (
    <Box>
      <Box bgcolor="#1C1C5E">
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0px',
            gap: 1,
          }}
        >
          <House
            sx={{
              fontSize: 30,
              color: 'white',
            }}
          />
          <ArrowForwardIos
            sx={{
              fontSize: 16,
              color: 'grey.600',
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              color: 'grey.800',
            }}
          >
            Perfil Meu Espaço
          </Typography>
          <ArrowForwardIos
            sx={{
              fontSize: 16,
              color: 'grey.600',
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              color: 'white',
            }}
          >
            Minha Conta
          </Typography>
        </Container>
      </Box>
      <Box bgcolor="grey.200">
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
          }}
        >
          <Typography fontSize={24} fontWeight={700}>
            Olá, Rafaela Oliveira Marques (email@gmail.com)
          </Typography>
          <Typography fontSize={18}>
            Seu ultimo acesso foi sexta-feira (15/11/2024) às 15:30:03
          </Typography>
        </Container>

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<ArrowForwardIos />} />
          <BottomNavigationAction
            label="Favorites"
            icon={<ArrowForwardIos />}
          />
          <BottomNavigationAction label="Nearby" icon={<ArrowForwardIos />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
};
