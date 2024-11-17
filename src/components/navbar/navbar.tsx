'use client';
import { ArrowDropDown, Contrast, Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  MenuItem,
  styled,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const LightTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
  )
)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: 'rgba(0, 0, 0, 0.87)',
  boxShadow: theme.shadows[1],
  fontSize: 11,
  padding: 0,
  margin: 4,
}));

export function Navbar() {
  return (
    <Container maxWidth="xl">
      <Box
        display={'flex'}
        alignItems="center"
        py={2}
        justifyContent="space-between"
      >
        <Box display={'flex'} alignItems="center" gap={1}>
          <Image
            src="/assets/govbr-logo-large.png"
            alt="logo"
            width={100}
            height={50}
            style={{
              objectFit: 'contain',
            }}
          />
          <Typography>Ministério da Educação/CAPES</Typography>
        </Box>
        <Box display={'flex'} alignItems="center" gap={2}>
          <Typography fontSize={16} color="#2170d8">
            {' '}
            Órgãos do Governo
          </Typography>
          <Typography fontSize={16} color="#2170d8">
            {' '}
            Acesso à Informação
          </Typography>
          <Typography fontSize={16} color="#2170d8">
            {' '}
            Legislação
          </Typography>
          <Typography fontSize={16} color="#2170d8">
            {' '}
            Acessibilidade
          </Typography>
          <Contrast />
          <Button
            variant="text"
            startIcon={
              <Person
                sx={{
                  color: '#2170d8',
                }}
              />
            }
            sx={{
              borderRadius: '50px',
              bgcolor: 'grey.100',
              textTransform: 'none',
              px: 2,
              py: 1,
            }}
          >
            <Typography fontSize={16} color="#2170d8">
              Entrar
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        display={'flex'}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display={'flex'} alignItems="center" gap={2}>
          <Image
            src="/assets/logocapes2.png"
            alt="logo"
            width={140}
            height={26}
            style={{
              objectFit: 'contain',
            }}
          />
          <Image
            src="/assets/logo_periodicos-simples2.jpg"
            alt="logo"
            width={210}
            height={30}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box display={'flex'} alignItems="center" gap={7}>
          <Typography
            fontSize={19}
            sx={{
              cursor: 'pointer',
            }}
          >
            Sobre
          </Typography>
          <LightTooltip
            title={
              <Box>
                <MenuItem
                  sx={{
                    p: 2,
                  }}
                >
                  Buscar assunto
                </MenuItem>
                <MenuItem
                  sx={{
                    p: 2,
                  }}
                >
                  Lista de bases e coleções
                </MenuItem>
                <MenuItem
                  sx={{
                    p: 2,
                  }}
                >
                  Lista de livros
                </MenuItem>
                <MenuItem
                  sx={{
                    p: 2,
                  }}
                >
                  Lista de periódicos
                </MenuItem>
                <MenuItem
                  sx={{
                    p: 2,
                  }}
                >
                  Sugestões para Trabalhos Futuros
                </MenuItem>
              </Box>
            }
          >
            <Typography
              fontSize={19}
              sx={{
                cursor: 'pointer',
              }}
            >
              Acervo
            </Typography>
          </LightTooltip>
          <Typography
            sx={{
              cursor: 'pointer',
            }}
            fontSize={19}
          >
            Treinamentos
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
            }}
            fontSize={19}
          >
            Informativos
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
            }}
            fontSize={19}
          >
            Ajuda
          </Typography>
          <Link href="/my-account">
            <Button variant="outlined">Meu Espaço</Button>
          </Link>
        </Box>
      </Box>
      <Typography fontSize={14}>
        Você tem acesso ao conteúdo gratuito do Portal de Periódicos da CAPES
      </Typography>
      <Typography fontSize={18} mb={3} display="flex" alignItems="center">
        Acesso CAFe <ArrowDropDown />
      </Typography>
    </Container>
  );
}
