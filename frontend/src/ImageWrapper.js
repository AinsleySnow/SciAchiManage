import React from 'react';
import { styled } from '@mui/material/styles';
import { Image } from 'mui-image';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CameraAlt } from '@mui/icons-material';
import { Stack } from '@mui/system';


function ImageWrapper(props) {
  const MaskStyled = styled(Box)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: none;
  `;

  const ContainerStyled = styled(Box)`
    position: absolute;
    &:hover {
      .mask {
        display: flex;
      }
    }
  `;

  return (
    <ContainerStyled component='form'>
      <label htmlFor='file-upload'>
        <input
          id='file-upload'
          name='file-upload'
          type='file'
          style={{ display: 'none' }}
        />
        <Image
          height={props.height}
          width={props.width}
          src={props.url}
          alt='featured'
        />
        <MaskStyled className='mask'
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Stack>
            <CameraAlt
              sx={{ fontSize: '5rem', color: 'white', mb: '2' }} />
            <Typography variant="subtitle1" align="center" sx={{ color: 'white' }}>
              上传图片
            </Typography>
          </Stack>
        </MaskStyled>
      </label>
    </ContainerStyled >
  );
}

export default ImageWrapper;
