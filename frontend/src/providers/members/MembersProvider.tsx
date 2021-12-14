import listMembersUseCase from 'domain/members/usecases/list_members_usecase';
import ListProvider from 'providers/list/ListProvider';
import { FC } from 'react';
import MembersContext from './MembersContext';

const MembersProvider: FC = ({ children }) => {
  return (
    <ListProvider context={MembersContext} listItems={listMembersUseCase}>
      {children}
    </ListProvider>
  );
};

export default MembersProvider;
