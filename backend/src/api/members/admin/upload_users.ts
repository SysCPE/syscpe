import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import { File } from 'formidable';
import fs from 'fs';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const uploadUsers = async (ctx: Context) => {
  if (!ctx.request.files) ctx.throw(400, 'Empty file');

  const files = ctx.request.files || {};
  const manyFilesUploaded = Object.keys(ctx.request.files || {}).length > 1;
  if (manyFilesUploaded) ctx.throw(400, 'Only one file is allowed');

  const usecase = new CreateAdminMembersFromCSVFile(ServicesMembersRepository);
  const usersFile = files.users as File;
  const fileBuffer = fs.readFileSync(usersFile.path);
  const adminUsers = await usecase.run(fileBuffer);

  ctx.response.body = { created_users: adminUsers.length };
};

export default uploadUsers;
