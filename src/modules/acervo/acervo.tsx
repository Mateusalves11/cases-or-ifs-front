'use client';
import {
  Content,
  ContentControllerApiFactory,
  UserControllerApiFactory,
} from '@/services/openapi-services';
import { ArrowDropDown, Login, Star, StarBorder } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const {
  getFavoritesByUserId,
  putFavorited,
  removeFavorite,
} = UserControllerApiFactory();
const { getAllContents } = ContentControllerApiFactory();

export function AcervoScreen() {
  const [data, setData] = useState<Array<Content>>([]);
  const [dataF, setDataF] = useState<Array<Content>>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const getFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const data = await getFavoritesByUserId({
        userId: 1,
      });
      setDataF(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const getAllContent = async () => {
    try {
      const data = await getAllContents();
      setData(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllContent();
  }, []);
  return (
    <Box bgcolor="grey.100" py={2}>
      <Container maxWidth="xl">
        <TextField
          id="outlined-basic"
          label="Inserir termo"
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              bgcolor: 'white',
            },
            mb: 4,
          }}
          variant="filled"
        />
        <Typography>Resultados:</Typography>
        {data?.map((content, index) => (
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
            </Box>
            <Typography borderLeft="1px solid" pl={2} mb={2}>
              {content.resumen}
            </Typography>
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
      </Container>
    </Box>
  );
}
