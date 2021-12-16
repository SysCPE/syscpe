import ChangeAdminMemberDepartment from 'domain/usecases/change_admin_member_department';
import ServicesDepartmentRepository from 'services/service_department_repository';
import ServicesMembersRepository from 'services/service_members_repository';
import { Context } from 'koa';
import { AdminMemberNotFoundError } from 'domain/repository/admin_members_repository';
import { DepartmentNotFoundError } from 'domain/repository/department_repository';

const changeDepartment = async (ctx: Context) => {
  const usecase = new ChangeAdminMemberDepartment(ServicesMembersRepository, ServicesDepartmentRepository);
  const memberId = ctx.request.body.memberId;
  const departmentName = ctx.request.body.departmentName;

  try {
    await usecase.run(memberId, departmentName);
  }
  catch (e) {
    if (e instanceof AdminMemberNotFoundError)
      ctx.throw(400, `Cannot find member with ID ${memberId}`);
    if (e instanceof DepartmentNotFoundError)
      ctx.throw(400, `Cannot find Department ${departmentName}`);
  }
  ctx.response.body = {};
};

export default changeDepartment;