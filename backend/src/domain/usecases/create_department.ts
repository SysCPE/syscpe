import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";

export default class CreateDepartment {
    private departmentRepository: DepartmentRepository;

    constructor(departmentRepository: DepartmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    async run(department_name: string): Promise<DepartmentEntity | undefined> {
        const department = await this.departmentRepository.createDepartment(department_name);
        return await this.departmentRepository.saveDepartment(department) ? department : undefined;
    }
}