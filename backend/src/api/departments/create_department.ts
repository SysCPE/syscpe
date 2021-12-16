import { DepartmentAlreadyExistsError } from "domain/repository/department_repository";
import CreateDepartment from "domain/usecases/create_department";
import { Context } from "koa";
import ServicesDepartmentRepository from "services/service_department_repository";

const createDepartment = async (ctx: Context) => {
    const usecase = new CreateDepartment(ServicesDepartmentRepository);
    const name = ctx.request.body.name;
    const creationDate = ctx.request.body.creationDate;

    try {
        await usecase.run(name, creationDate);
    } catch (error) {
        if (error instanceof DepartmentAlreadyExistsError) {
            ctx.throw(400, error.message);
        }
        throw error;
    }
     
    ctx.response.body = {};
};

export default createDepartment;