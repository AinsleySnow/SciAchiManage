import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Image } from 'mui-image';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CameraAlt } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { API_URL } from './Constants';


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

  const [src, setSrc] = useState(props.url);

  const doUpload = (event) => {
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append('image', img);

    fetch(API_URL + '/imgupload', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.text())
    .then((url) => setSrc(url));

    props.onPicUpdated(src);
  };

  return (
    <ContainerStyled>
      <label htmlFor='img-upload'>
        <input
          onChange={doUpload}
          id='img-upload'
          name='img-upload'
          type='file'
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
        />
        <Image
          height={props.height}
          width={props.width}
          src={src}
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
