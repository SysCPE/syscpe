import AdminMemberEntity from "./admin_member_entity";

type DepartmentEntity = {
    name: string;
    creationDate: Date;
    director?: AdminMemberEntity;
    viceDirector?: AdminMemberEntity;
};

export default DepartmentEntity;
