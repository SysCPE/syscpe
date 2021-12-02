import DepartmentEntity from "domain/entities/department_entity";
import DepartmentRepository from "domain/repository/department_repository";

export default class ListDepartments {
    private departmentsRepository: DepartmentRepository;

    constructor(departmentsRepository: DepartmentRepository) {
        this.departmentsRepository = departmentsRepository;
    }

    async run(): Promise<DepartmentEntity[]> {
        return this.departmentsRepository.getAllDepartments();
    }
}