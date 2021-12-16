import WorkGroupRepository, { UpdateWorkGroupParams } from "domain/repository/work_group_repository";

export default class UpdateWorkGroup {
    private workgroupRepository: WorkGroupRepository;

    constructor (workgroupRepository: WorkGroupRepository) {
        this.workgroupRepository = workgroupRepository;
    }

    async run(name: string, changes: UpdateWorkGroupParams): Promise<void> {
        await this.workgroupRepository.updateWorkGroup(name, changes);
    }
}