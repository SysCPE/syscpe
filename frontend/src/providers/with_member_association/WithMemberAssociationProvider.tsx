import MemberEntity from 'domain/members/entities/MemberEntity';
import { Context, PropsWithChildren } from 'react';
import WithMemberAssociationContextType from './WithMemberAssociationContextType';

type Props<T> = {
  context: Context<WithMemberAssociationContextType<T>>;
  associateMember: (member: MemberEntity, item: T) => Promise<void>;
};
function WithMemberAssociationProvider<T>({
  context,
  associateMember,
  children,
}: PropsWithChildren<Props<T>>) {
  return (
    <context.Provider value={{ associateMember }}>{children}</context.Provider>
  );
}

export default WithMemberAssociationProvider;
