import Department from "database/models/Department";
import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";
import { ForeignKeyConstraintError, ValidationError } from "sequelize/types";
import { __mapAdminMemberModelToEntity }  from "services/service_members_repository"
import ServicesMembersRepository from "services/service_members_repository";

const ServicesDepartmentRepository: DepartmentRepository = {
    saveDepartment: async function (name: string, creationDate?: Date): Promise<DepartmentEntity> {

        const department = await Department.create({
            name: name,
            creationDate: creationDate || new Date(),
        });

        return { name: department.name, creationDate: department.creationDate };
    },

    getAllDepartments: async function (): Promise<DepartmentEntity[]> {
        const result = await Department.findAll();

        return result.map(__mapDepartmentModelToEntity);
    },

    getDepartment: async function (name: string): Promise<DepartmentEntity | null> {
        const result = await Department.findOne({
            where: { name: name }
        });

        if (!result) return null;
        return __mapDepartmentModelToEntity(result);
    },

    updateDepartment: async function (department: DepartmentEntity) {
        type returnType = [Boolean, String]
        const NO_DEPT_FOUND: returnType = [false, "NO DEPT"];
        const EMPTY_BODY: returnType = [false, "Empty body"];
        const OK : returnType = [true, "It's Saul Goodman"];
        const NO_ADMIN_MEMBER_FOUND = (memberId:any) => [false, "NO ADMIN MEMBER FOUND WITH ID " + memberId] as returnType;
        
        if(!department?.name) return EMPTY_BODY;

        try {

            const departmentModel =  await Department.findOne({
                where: {
                    name:department.name 
                }
            });

            const returnTuple =  await departmentModel?.update(department)
            .then(
                () => OK, 
                (reason: ForeignKeyConstraintError) => NO_ADMIN_MEMBER_FOUND(reason.parameters[0])
            );
            return returnTuple || NO_DEPT_FOUND;
        }
        catch (error) {
            return [false, error] as returnType; 
        }
    }
};

export const __mapDepartmentModelToEntity = (department: Department): DepartmentEntity => {

    const departmentEntity =  {
        name: department.name,
        creationDate: new Date(department.creationDate),
        director: department.directorId,
        viceDirector: department.directorId,
    }
    return departmentEntity;
};

export default ServicesDepartmentRepository;