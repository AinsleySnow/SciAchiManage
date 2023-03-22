import * as React from 'react';
import { Image } from 'mui-image';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '../AppBar';
import Orders from '../UserPanel/Orders';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Toolbar } from '@mui/material';


const theme = createTheme();

export default function Researcher() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerwidth='0'/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Stack direction={'row'} maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Toolbar />
            <Grid container spacing={3}
              sx={{ pl: 5, pr: 5 }}
            >
              <Grid item xs={12} md='auto'>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Image width={300} height={300} src='https://source.unsplash.com/random' />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  A California appellate court overturned a murder conviction based on 2022 state legislation that limits the use of rap videos as evidence.
                  Travon Venable Sr of San Bernadino was convicted of first-degree murder for a 2019 drive-by shooting that killed one person and wounded another. He was sentenced to a total of 129 years to life, according to court documents. The appeal said the judge erred by admitting the rap video presented at the trial because it was prejudicial.
                  This was the first time courts used the 2022 California legislation that limits the use of rap lyrics and video as evidence. The law which took effect on Jan. 1, 2023, was signed by California Gov. Gavin Newsom, alongside rap artists Meek Mill, Too $hort, E-40, Killer Mike, YG, Ty Dolla $ign, and Tyga, according to Newsom's office.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 4 }}>
                  <Orders />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
