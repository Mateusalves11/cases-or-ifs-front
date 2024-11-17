'use client';
import {
  ArrowDropDown,
  ArrowForwardIos,
  House,
  Login,
  Search,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { Content, UserControllerApiFactory } from '@/services/openapi-services';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const {
  getFavoritesByUserId,
  putFavorited,
  removeFavorite,
} = UserControllerApiFactory();

export const MyAccountScreen = () => {
  const [value, setValue] = useState(0);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [data, setData] = useState<Array<Content>>([]);
  const [search, setSearch] = useState('');
  const getFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const data = await getFavoritesByUserId({
        userId: 1,
      });
      setData(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const filterData = data.filter((content) =>
    content?.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Box bgcolor="grey.200" height="100%">
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
              color: 'grey.500',
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
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              background: 'transparent',
              mt: 4,
              '& .Mui-selected': {
                color: 'white',
                borderColor: 'black',
                bgcolor: '#1C1C5E',
              },
            }}
          >
            <BottomNavigationAction
              sx={{
                border: '1px solid',
                borderRight: 'none',
                bgcolor: 'grey.400',
              }}
              label="Minha conta"
            />
            <BottomNavigationAction
              sx={{
                border: '1px solid',
                borderRight: 'none',
                bgcolor: 'grey.400',
              }}
              label="Treinamentos cursados"
            />
            <BottomNavigationAction
              sx={{
                border: '1px solid',
                borderRight: 'none',
                bgcolor: 'grey.400',
              }}
              label="Favoritos"
            />
            <BottomNavigationAction
              sx={{
                border: '1px solid',
                bgcolor: 'grey.400',
              }}
              label="Sugestões"
            />
          </BottomNavigation>
          <Box display="flex" flexDirection="column" mt={4}>
            {(value === 2 || value === 3) && (
              <>
                {data.length === 0 && (
                  <Typography mt={4}>
                    Você ainda não possui conteúdos favoritados.
                  </Typography>
                )}

                {data.length > 0 && value === 2 && (
                  <Box display="flex" justifyContent="center">
                    <TextField
                      id="outlined-basic"
                      label="Pesquisar favoritos"
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{
                                bgcolor: 'white',
                              }}
                            >
                              <Search />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        bgcolor: 'white',
                        maxWidth: 400,
                        mb: 4,
                      }}
                      variant="outlined"
                    />
                  </Box>
                )}

                {filterData?.map((content, index) => (
                  <Box key={content.id} mb={1} p={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography color="#1C1C5E" fontWeight={700} mb={1}>
                        <Typography
                          component="span"
                          mr={1}
                          fontSize={16}
                          fontWeight={700}
                          color="grey.600"
                        >
                          {index + 1}
                        </Typography>{' '}
                        {content.name}
                      </Typography>
                      {value === 2 && (
                        <>
                          {data.find((item) => item.id === content.id) ? (
                            <IconButton
                              size="small"
                              disabled={loadingFavorites}
                              onClick={async () => {
                                try {
                                  await removeFavorite({
                                    userId: 1,
                                    contentId: content.id || 0,
                                  });
                                  getFavorites();
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                            >
                              <Star color="warning" />
                            </IconButton>
                          ) : (
                            <IconButton
                              disabled={loadingFavorites}
                              size="small"
                              onClick={async () => {
                                try {
                                  await putFavorited({
                                    favoriteRequestDTO: {
                                      userId: 1,
                                      contentId: content.id,
                                    },
                                  });
                                  getFavorites();
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                            >
                              <StarBorder color="warning" />
                            </IconButton>
                          )}
                        </>
                      )}
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                      <Login />
                      <Link
                        href={content.link || ''}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Typography color="#1C1C5E" fontWeight={700}>
                          Acessar
                        </Typography>
                      </Link>
                      <Box display="flex" alignItems="center">
                        <Typography color="grey.700">
                          Disponibilidade
                        </Typography>
                        <ArrowDropDown />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
