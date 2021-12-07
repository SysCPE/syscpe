import WorkGroupEntity from "domain/entities/work_group_entity";

type WorkGroupRepository = {
    getWorkGroup: (name: string) => Promise<WorkGroupEntity | null>;
    
    saveWorkGroup: (name: string, creationDate?: Date) => Promise<WorkGroupEntity>;

    getAllWorkGroups: () => Promise<WorkGroupEntity[]>;

    endWorkGroup: (name: string) => Promise<WorkGroupEntity>;
};

export default WorkGroupRepository;