import WorkGroupEntity from "domain/entities/work_group_entity";
import WorkGroupRepository from "domain/repository/work_group_repository";

export default class ListWorkGroups {
    private workGroupRepository: WorkGroupRepository;

    constructor(workGroupRepository: WorkGroupRepository) {
        this.workGroupRepository = workGroupRepository;
    }

    async run(): Promise<WorkGroupEntity[]> {
        return this.workGroupRepository.getAllWorkGroups();
    }

}