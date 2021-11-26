import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";

const ServicesDepartmentRepository: DepartmentRepository = {
    createDepartment: async function (name: string, creationDate?: Date): Promise<DepartmentEntity> {
        return {
            name: name,
            creationDate: creationDate || new Date(),
        };
    },

    saveDepartment: async function (department: DepartmentEntity): Promise<boolean> {
        throw new Error("Function not implemented.");
    }
};