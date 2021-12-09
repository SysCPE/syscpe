import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";

export default class CreateDepartment {
    private departmentRepository: DepartmentRepository;

    constructor(departmentRepository: DepartmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    
    async run(departmentName: string): Promise<DepartmentEntity> {
        return this.departmentRepository.saveDepartment(departmentName);
    }
}