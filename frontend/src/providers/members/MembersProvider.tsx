import MemberEntity from 'domain/members/entities/MemberEntity';
import listMembersUseCase from 'domain/members/usecases/list_members_usecase';
import { FC, useEffect, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';
import MembersContext from './MembersContext';

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

  const onMemberDeleted = (deletedMember: MemberEntity) =>
    setMembers((members) =>
      members.filter((member) => member.idCPE !== deletedMember.idCPE)
    );

  return (
    <MembersContext.Provider
      value={{ members, done, loading, failed, retry, onMemberDeleted }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
