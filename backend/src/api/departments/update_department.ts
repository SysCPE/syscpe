import { AdminMemberNotFoundError } from 'domain/repository/admin_members_repository';
import { DepartmentNotFoundError } from 'domain/repository/department_repository';
import UpdateDepartment from 'domain/usecases/update_department';
import { Context } from 'koa';
import ServicesDepartmentRepository from 'services/service_department_repository';

const updateDepartment = async (ctx: Context) => {
  const usecase = new UpdateDepartment(ServicesDepartmentRepository);

  const name = ctx.request.body.name;
  if (!name) ctx.throw(400, 'No department name provided');

  try {
    await usecase.run(name, {
      creationDate: ctx.request.body.creationDate,
      directorId: ctx.request.body.directorId,
      viceDirectorId: ctx.request.body.viceDirectorId,
    });
  } catch (error) {
    if (
      error instanceof AdminMemberNotFoundError ||
      error instanceof DepartmentNotFoundError
    ) {
      ctx.throw(400, error.message);
    }
    throw error;
  }

  ctx.response.body = {};
};

export default updateDepartment;
