import DepartmentEntity from "domain/entities/department_entity";

export class DepartmentNotFoundError extends Error { }

type DepartmentRepository = {
    getDepartment: (name: string) => Promise<DepartmentEntity | null>;
    
    saveDepartment: (name: string, creationDate?: Date) => Promise<DepartmentEntity>;

    getAllDepartments: () => Promise<DepartmentEntity[]>;

    updateDepartment: (department: DepartmentEntity) => Promise<[Boolean, String]>;
};

export default DepartmentRepository;