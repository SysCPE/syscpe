import WorkGroupRepository from "domain/repository/work_group_repository";

export default class EndWorkGroup {
    private workgroupRepository: WorkGroupRepository;
    constructor(workgroupRepository: WorkGroupRepository) {
        this.workgroupRepository = workgroupRepository;
    }

    async run(workgroupName: string): Promise<void> {
        await this.workgroupRepository.endWorkGroup(workgroupName);
    }
}