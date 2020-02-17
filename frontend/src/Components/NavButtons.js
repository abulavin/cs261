import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const Buttons = () => (
    <div>
      <Button icon labelPosition='left'>
        <Icon name='settings' />
        Settings
      </Button>
      <Button icon labelPosition='center'>
        <Icon name='feedback' />
        Feedback
      </Button>
      <Button icon labelPosition='right'>
        <Icon name='user guide' />
        UserGuide
      </Button>
    </div>
  )
  
  export default Buttons