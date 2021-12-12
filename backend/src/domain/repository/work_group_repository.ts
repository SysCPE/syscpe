import WorkGroupEntity from "domain/entities/work_group_entity";

export class WorkGroupNotFoundError extends Error { }
export class WorkGroupAlreadyExistsError extends Error { };
export class WorkGroupAlreadyEndedError extends Error { };

export type UpdateWorkGroupParams = {
    description?: string;
    creationDate?: Date;
};

type WorkGroupRepository = {
    getWorkGroup: (name: string) => Promise<WorkGroupEntity | null>;
    
    saveWorkGroup: (name: string, description?: string, creationDate?: Date) => Promise<WorkGroupEntity>;

    getAllWorkGroups: () => Promise<WorkGroupEntity[]>;

    endWorkGroup: (name: string) => Promise<void>;

    updateWorkGroup: (name: string, changes: UpdateWorkGroupParams) => Promise<void>;
};

export default WorkGroupRepository;