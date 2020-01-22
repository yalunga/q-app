import React from 'react';
import { Box, Text, Image, Stack } from 'grommet'
import { Share } from 'grommet-icons';

export default (props) => (
  <Stack anchor="top-right">
    <Box
      width="full"
      elevation="small"
      background="white"
      round="xxsmall"
      pad={{ horizontal: "small", vertical: "small" }}
      alignContent="center"
      background="white"
      direction="row"
      gap="small"
    >
      <Box round="full" height="xxsmall" width="xxsmall" elevation="xsmall">
        <Image fit="cover" fill src="//v2.grommet.io/assets/IMG_4245.jpg" style={{ borderRadius: "100%" }} />
      </Box>
      <Box basis="1/2" justify="center">
        <Text size='small' weight='bold'>ayalung</Text>
        <Text size="xsmall" weight='bold' color='dark-4'>13 mins ago</Text>
      </Box>
    </Box>
    <Box pad="small">
      <Share size="small" color="dark-5" />
    </Box>
  </Stack>
);