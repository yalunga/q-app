import React from 'react'

import { Grommet, Box, Button } from 'grommet';
import { User } from 'grommet-icons';

export default () => (
  <Grommet>
    <Box
      direction="row-responsive"
      justify="center"
      align="center"
      pad="xlarge"
      gap="medium"
    >
      <Box
        pad="large"
        align="center"
        background={{ color: "light", opacity: "strong" }}
        round
        gap="small"
        elevation="large"
      >
        <User size="large" color="brand" />
        <Button primary label="Login With Twitch" href="http://localhost:8000/login" />
      </Box>
    </Box>
  </Grommet>
);