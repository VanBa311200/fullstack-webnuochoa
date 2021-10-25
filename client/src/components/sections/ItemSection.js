import { Grid, Box, Button } from '@mui/material'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useHistory } from 'react-router'

import { WapperContent, ColContent } from './ElSectionPR'

const ItemSection = ({ data }) => {
  const history = useHistory()

  return (
    <WapperContent>
      <Grid container>
        <ColContent item xs={12} sm={6} md={6} lg={6}>
          <img src={data.img} alt="photos" />
        </ColContent>
        <ColContent item xs={12} sm={6} md={6} lg={6} {...data}>
          <Box>
            <h3>{data.brand}</h3>
            <p>
              <strong>{data.title}</strong>
              <em>{data.sub_title}</em>
            </p>
            <p>
              {data.paragrap}
            </p>
            <Box component='aside'>
              <Button
                variant="outlined"
                sx={{ borderRadius: 'unset' }}
                endIcon={<BsArrowRight />}
                onClick={() => history.push(data.link)}
              >
                Xem thêm
              </Button>
            </Box>
          </Box>
        </ColContent>
      </Grid>
    </WapperContent>
  )
}

export default ItemSection
