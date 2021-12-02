import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import fs from 'fs';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const uploadUsers = async (ctx: Context) => {
  if (!ctx.request.files) ctx.throw(400, 'Empty file');

  if (Array.isArray(ctx.request.files?.users)) {
    ctx.throw(400, 'Only one file is allowed');
  }

  // const manyFilesUploaded = Object.keys(ctx.request.files || {}).length > 1;
  // if (manyFilesUploaded) ctx.throw(400, 'Only one file is allowed');

  const usecase = new CreateAdminMembersFromCSVFile(ServicesMembersRepository);
  const usersFile = ctx.request.files?.users;
  const fileBuffer = fs.readFileSync(usersFile.path);
  const adminUsers = await usecase.run(fileBuffer);

  ctx.response.body = { created_users: adminUsers.length };
};

export default uploadUsers;
