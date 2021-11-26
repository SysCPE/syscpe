import DepartmentEntity from "domain/entities/department_entity";

type DepartmentRepository = {
    createDepartment: (name: string, creationDate?: Date) => Promise<DepartmentEntity>;
    saveDepartment: (department: DepartmentEntity) => Promise<boolean>;
};

export default DepartmentRepository;