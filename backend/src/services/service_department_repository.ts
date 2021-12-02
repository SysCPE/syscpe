import Department from "database/models/Department";
import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";

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
};

const __mapDepartmentModelToEntity = (department: Department): DepartmentEntity => {
    return {
        name: department.name,
        creationDate: department.creationDate,
    };
};

export default ServicesDepartmentRepository;