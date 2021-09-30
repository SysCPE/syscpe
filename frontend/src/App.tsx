import { Button, Typography } from '@material-ui/core';
import APP_NAME from 'config/app_name';
import { useState } from 'react';

function App() {
  const [hide, setHide] = useState(false);

  return (
    <div>
      <div>{!hide && <Typography variant="h6">{APP_NAME}</Typography>}</div>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setHide(true)}
        >
          Hide
        </Button>
      </div>
    </div>
  );
}

export default App;
