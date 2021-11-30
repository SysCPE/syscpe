import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import fs from 'fs';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const uploadUsers = async (ctx: Context) => {
  if (Array.isArray(ctx.request.files?.users)) {
    ctx.throw(400, 'Only one file is allowed');
  }

  const usecase = new CreateAdminMembersFromCSVFile(ServicesMembersRepository);
  const fileBuffer = fs.readFileSync(ctx.request.files?.users.path as string);
  const adminUsers = await usecase.run(fileBuffer);

  ctx.response.body = { created_users: adminUsers.length };
};

export default uploadUsers;
