import WithMemberAssociationContextType from './WithMemberAssociationContextType';

function defaultWithMemberAssociationContext<
  T
>(): WithMemberAssociationContextType<T> {
  return {
    associateMember: async () => {},
  };
}

export default defaultWithMemberAssociationContext;
