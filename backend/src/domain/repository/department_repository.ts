import DepartmentEntity from "domain/entities/department_entity";

export class DepartmentNotFoundError extends Error { };
export class DepartmentAlreadyExistsError extends Error { };

export type UpdateDepartmentParams = {
    creationDate?: Date;
    directorId?: number;
    viceDirectorId?: number;
};

type DepartmentRepository = {
    getDepartment: (name: string) => Promise<DepartmentEntity | null>;
    
    saveDepartment: (name: string, creationDate?: Date) => Promise<DepartmentEntity>;

    getAllDepartments: () => Promise<DepartmentEntity[]>;

    updateDepartment: (name: string, changes: UpdateDepartmentParams) => Promise<void>;
};


export default DepartmentRepository;