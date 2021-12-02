import ListDepartments from 'domain/usecases/list_departments';
import ServicesDepartmentRepository from 'services/service_department_repository';
import { Context } from 'koa';

const getAllDepartments = async (ctx: Context) => {
  const usecase = new ListDepartments(ServicesDepartmentRepository);
  const departments = await usecase.run();

  ctx.response.body = { departments: departments };
};

export default getAllDepartments;