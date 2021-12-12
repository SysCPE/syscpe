import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

type Request = {
  idCPE: number;
};
const deleteMember = async (ctx: Context) => {
  const { idCPE } = ctx.request.body as Request;

  if (!idCPE) ctx.throw(400, 'idCPE cannot be empty');

  const memberExists =
    (await ServicesMembersRepository.getAdminMember(idCPE)) !== null;

  if (!memberExists) ctx.throw(404, 'member does not exist');

  await ServicesMembersRepository.deleteMember(idCPE);
  ctx.response.body = 'member deleted';
};

export default deleteMember;
