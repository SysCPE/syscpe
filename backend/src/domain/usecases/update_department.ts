import DepartmentRepository, { UpdateDepartmentParams } from "domain/repository/department_repository";

export default class UpdateDepartment {
    private departmentsRepository: DepartmentRepository;

    constructor(departmentsRepository: DepartmentRepository) {
        this.departmentsRepository = departmentsRepository;
    }

    async run(name: string, changes: UpdateDepartmentParams): Promise<[Boolean, String]> {
        return this.departmentsRepository.updateDepartment(name, changes);
    }
}