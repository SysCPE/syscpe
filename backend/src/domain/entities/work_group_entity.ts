type WorkGroupEntity = {
    name: string;
    members?: number[]; // Array of idCPEs

    description?: string;
    creationDate?: Date;
    endDate?: Date;
}

export default WorkGroupEntity;