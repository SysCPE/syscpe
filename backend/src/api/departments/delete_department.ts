import { DepartmentNotFoundError } from 'domain/repository/department_repository';
import { Context } from 'koa';
import ServicesDepartmentRepository from 'services/service_department_repository';

type Request = {
    name: string;
};
const deleteDepartment = async (ctx: Context) => {
    const { name } = ctx.request.body as Request;
    if (!name) ctx.throw(400, `Department name cannot be empty`);

    try {
        await ServicesDepartmentRepository.deleteDepartment(name);
    }
    catch (error) {
        if (error instanceof DepartmentNotFoundError)
            ctx.throw(400, error.message);
        throw error;
    }

    ctx.response.body = `Department ${name} deleted successfully.`;
};

export default deleteDepartment;