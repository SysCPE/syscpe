import CreateDepartment from "domain/usecases/create_department";
import { Context } from "koa";
import ServicesDepartmentRepository from "services/service_department_repository";

const createDepartment = async (ctx: Context) => {
    const usecase = new CreateDepartment(ServicesDepartmentRepository);
    const departmentName = ctx.request.body.departmentName;
    await usecase.run(departmentName);
    ctx.body = {};
};

export default createDepartment;