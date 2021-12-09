import ServicesDepartmentRepository from 'services/service_department_repository';
import { Context } from 'koa';
import UpdateDepartment from 'domain/usecases/updateDepartment';

const updateDepartment = async (ctx: Context) => {
  console.log("REQUEST BODY: ");
  const a = ctx.request.body?.name;  
  console.log(a);
  const usecase = new UpdateDepartment(ServicesDepartmentRepository);
  const response = await usecase.run(ctx.request.body);

  ctx.response.body = { response };
};

export default updateDepartment;