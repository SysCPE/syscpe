import ListAdminMembers from 'domain/usecases/list_admin_members';
import ServicesMembersRepository from 'services/service_members_repository';
import { Context } from 'koa';

const getAllAdminMembers = async (ctx: Context) => {
  const usecase = new ListAdminMembers(ServicesMembersRepository);
  const adminMembers= await usecase.run();

  ctx.response.body = { users: adminMembers };
};

export default getAllAdminMembers;