import ServicesDepartmentRepository from 'services/service_department_repository';
import { Context } from 'koa';
import UpdateDepartment from 'domain/usecases/updateDepartment';

const updateDepartment = async (ctx: Context) => {
  const usecase = new UpdateDepartment(ServicesDepartmentRepository);
  const response = await usecase.run(ctx.request.body);
  if (!response[0]) ctx.throw(400, response[1])
  ctx.response.body = response[1] ;
};

export default updateDepartment;