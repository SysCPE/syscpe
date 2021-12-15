type WorkgroupEntity = {
    id: string;
    name: string;
    members?: number[];

    description: string;
    creationDate: Date;
    endDate?: Date;
  };
  
  export default WorkgroupEntity;