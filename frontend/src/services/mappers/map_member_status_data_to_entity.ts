import MemberStatusEntity from 'domain/members/entities/MemberStatusEntity';

const mapMemberStatusDataToEntity = (status: string): MemberStatusEntity => {
  if (['ACTIVE', 'INACTIVE', 'TIMEOFF'].includes(status))
    return status as MemberStatusEntity;

  throw new Error(`${status} is not a valid value for MemberStatusEntity`);
};

export default mapMemberStatusDataToEntity;
