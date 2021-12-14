import MemberEntity from 'domain/members/entities/MemberEntity';
import listMembersUseCase from 'domain/members/usecases/list_members_usecase';
import ListProvider from 'providers/list/ListProvider';
import { FC, useEffect, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';
import MembersContext from './MembersContext';
import MembersListContext from './MembersListContext';

const MembersProvider: FC = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const [members, setMembers] = useState<MemberEntity[]>([]);
  const { done, failed, loading, submit } = useSubmit(
    () => delayed(listMembersUseCase()),
    (members) => setMembers(members)
  );

  useEffect(() => {
    if (firstLoad) return;
    setFirstLoad(true);
    submit();
  }, [submit, firstLoad]);

  const retry = () => {
    if (!failed) return;
    submit();
  };

  const onMembersCreated = (createdMembers: MemberEntity[]) =>
    setMembers((members) => createdMembers.concat(members));

  const onMemberDeleted = (deletedMember: MemberEntity) =>
    setMembers((members) =>
      members.filter((member) => member.idCPE !== deletedMember.idCPE)
    );

  const onMemberEdited = (editedMember: MemberEntity) =>
    setMembers((members) =>
      members.map((member) => {
        if (member.idCPE === editedMember.idCPE) return editedMember;
        return member;
      })
    );

  return (
    <ListProvider
      context={MembersListContext}
      value={{ items: members, loading, failed, done, retry }}
    >
      <MembersContext.Provider
        value={{
          onMemberDeleted,
          onMembersCreated,
          onMemberEdited,
        }}
      >
        {children}
      </MembersContext.Provider>
    </ListProvider>
  );
};

export default MembersProvider;
