import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const uploadUsers = async (ctx: Context) => {
  const usecase = new CreateAdminMembersFromCSVFile(ServicesMembersRepository);
  const adminUsers = await usecase.run(ctx.file.buffer);

  ctx.response.body = `${adminUsers.length} users created`;
};

export default uploadUsers;
