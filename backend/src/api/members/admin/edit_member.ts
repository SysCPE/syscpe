import AdminMemberEntity from 'domain/entities/admin_member_entity';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

type Request = {
  idCPE: number;
  data: AdminMemberEntity;
};
const editMember = async (ctx: Context) => {
  const { idCPE, data } = ctx.request.body as Request;

  if (!idCPE) ctx.throw(400, 'idCPE cannot be empty');
  if (!data) ctx.throw(400, 'data cannot be empty');

  const member = await ServicesMembersRepository.getAdminMember(idCPE);

  if (!member) ctx.throw(404, 'member does not exist');

  if (data.email !== member.email)
    ctx.throw(400, 'member cannot have email edited');

  await ServicesMembersRepository.editMember(idCPE, data);
  ctx.response.body = 'member edited';
};

export default editMember;
