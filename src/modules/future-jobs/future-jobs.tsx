'use client';
import {
  ArrowDropDown,
  ArrowForwardIos,
  House,
  Login,
  Star,
  StarBorder,
} from '@mui/icons-material';
import {
  Content,
  ContentControllerApiFactory,
  UserControllerApiFactory,
} from '@/services/openapi-services';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const { getAllFutureJobs } = ContentControllerApiFactory();
const {
  getFavoritesByUserId,
  removeFavorite,
  putFavorited,
} = UserControllerApiFactory();

export const FutureJobsScreen = () => {
  const [data, setData] = useState<Array<Content>>([]);
  const [dataF, setDataF] = useState<Array<Content>>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const getFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const data = await getAllFutureJobs();
      setData(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const getAll = async () => {
    try {
      const data = await getFavoritesByUserId({
        userId: 1,
      });
      setDataF(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = data.filter((content) =>
    content?.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getFavorites();
    getAll();
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
            Acervo
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
            Sugestões para Trabalhos Futuros
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
          <Typography
            fontSize={24}
            fontWeight={700}
            borderBottom="3px solid #F5712B"
          >
            Sugestões para Trabalhos Futuros
          </Typography>
          <Typography fontSize={16} mt={4} px={18}>
            Sugestões para trabalhos futuros permite localizar trabalhos
            academicos que possuem indicação para continuidade de pesquisa e
            evolução do tema. Tal funcionalidade permite pesquisadores, novos ou
            veteranos, conhecerem trabalhos que podem ser aprofundados,
            auxiliando na definição de tema e delimitação de pesquisa, e gerando
            robustez e profundidade.
          </Typography>

          <Box p={1} bgcolor="grey.300">
            <Button
              variant="text"
              color="primary"
              sx={{
                bgcolor: '#f16421',
                color: 'white',
                textTransform: 'none',
              }}
            >
              Busca por titulo
            </Button>
            <TextField
              id="outlined-basic"
              label="Inserir termo"
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              sx={{
                '& .MuiInputBase-input': {
                  bgcolor: 'white',
                },
                borderBottom: '1px solid #313131',
                mt: 2,
                mb: 4,
              }}
              variant="filled"
            />
            <>
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
                    {dataF.find((item) => item.id === content.id) ? (
                      <IconButton
                        size="small"
                        disabled={loadingFavorites}
                        onClick={async () => {
                          try {
                            await removeFavorite({
                              userId: 1,
                              contentId: content.id || 0,
                            });
                            getAll();

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
                            getAll();
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        <StarBorder color="warning" />
                      </IconButton>
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
                      <Typography color="grey.700">Disponibilidade</Typography>
                      <ArrowDropDown />
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
