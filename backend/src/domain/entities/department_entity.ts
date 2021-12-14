import AdminMemberEntity from "./admin_member_entity";

type DepartmentEntity = {
    name: string;
    creationDate?: Date;
    directorId?: number;
    viceDirectorId?: number;
};

export default DepartmentEntity;
