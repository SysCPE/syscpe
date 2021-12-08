import AdminMember from "database/models/AdminMember";
import Department from "database/models/Department";
import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";
import { __mapAdminMemberModelToEntity }  from "services/service_members_repository"

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
    }


};

export const __mapDepartmentModelToEntity = (department: Department): DepartmentEntity => {

    const departmentEntity =  {
        name: department.name,
        creationDate: department.creationDate,
        director: department.directorId,
        viceDirector: department.directorId,
    }
    return departmentEntity;
};

export default ServicesDepartmentRepository;