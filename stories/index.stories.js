import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, TextField } from '@material-ui/core';

storiesOf('Button', module)

  .add('default', () => 
    <Button>Default</Button>
  )

storiesOf('Text Input', module)

  .add('Home Player', () => 
    <TextField id="" label="Room" />
  )

  .add('Make Problems', () => 
    <TextField id="" placeholder="Test" />
  )
