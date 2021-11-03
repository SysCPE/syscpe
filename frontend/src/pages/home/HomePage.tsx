import { Button } from '@material-ui/core';
import verifyTokenUseCase from 'domain/token/verify_token_usecase';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div>
      <p>
        <Button
          onClick={async () => {
            console.log(await verifyTokenUseCase());
          }}
        >
          CLICK ME
        </Button>
      </p>
    </div>
  );
};

export default HomePage;
