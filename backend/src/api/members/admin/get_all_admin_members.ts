import ListAdminMembers from 'domain/usecases/list_admin_members';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const getAllAdminMembers = async (ctx: Context) => {
  const usecase = new ListAdminMembers(ServicesMembersRepository);
  const adminMembers = await usecase.run();

  ctx.response.body = { users: adminMembers };
};

export default getAllAdminMembers;
