import WorkGroupEntity from "domain/entities/work_group_entity";
import WorkGroupRepository from "domain/repository/work_group_repository";

export default class CreateWorkGroup {
    private WorkGroupRepository: WorkGroupRepository;

    constructor(WorkGroupRepository: WorkGroupRepository) {
        this.WorkGroupRepository = WorkGroupRepository;
    }

    async run(name: string, description?: string, creationDate?: Date): Promise<WorkGroupEntity> {
        return this.WorkGroupRepository.saveWorkGroup(name, description, creationDate);
    }
}