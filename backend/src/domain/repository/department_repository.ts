import DepartmentEntity from "domain/entities/department_entity";

type DepartmentRepository = {
    getDepartment: (name: string) => Promise<DepartmentEntity | null>;
    
    saveDepartment: (name: string, creationDate?: Date) => Promise<DepartmentEntity>;

    getAllDepartments: () => Promise<DepartmentEntity[]>;
};

export default DepartmentRepository;