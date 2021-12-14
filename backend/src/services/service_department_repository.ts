import Department from "database/models/Department";
import DepartmentEntity from "domain/entities/department_entity";
import { AdminMemberNotFoundError } from "domain/repository/admin_members_repository";
import DepartmentRepository, { DepartmentAlreadyExistsError, DepartmentNotFoundError, UpdateDepartmentParams } from "domain/repository/department_repository";
import { ForeignKeyConstraintError } from "sequelize";
import { ValidationError } from "sequelize";
import { __mapAdminMemberModelToEntity }  from "services/service_members_repository"
import { removeUndefined } from "utils";

const ServicesDepartmentRepository: DepartmentRepository = {
    saveDepartment: async function (name: string, creationDate?: Date): Promise<DepartmentEntity> {
        try {
            const department = await Department.create({
                name: name,
                creationDate: creationDate || new Date(),
            });
    
            return { name: department.name, creationDate: department.creationDate };
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new DepartmentAlreadyExistsError(`Department ${name} already exists`);
            }
            throw error;
        }

    },

    getAllDepartments: async function (): Promise<DepartmentEntity[]> {
        const result = await __getAllDepartmentModels();
        return result.map(__mapDepartmentModelToEntity);
    },

    getDepartment: async function (name: string): Promise<DepartmentEntity | null> {
        const result = await __getDepartmentModelByName(name);

        if (!result) return null;
        return __mapDepartmentModelToEntity(result);
    },

    updateDepartment: async function (name: string, changes: UpdateDepartmentParams): Promise<void> {
        const department = await __getDepartmentModelByName(name);
        if (!department) throw new DepartmentNotFoundError(`Department ${name} does not exist`);

        try {
            await department.update(removeUndefined(changes));
        }
        catch (error) {
            if (error instanceof ForeignKeyConstraintError)
                throw new AdminMemberNotFoundError(`Could not assign director or vice-director`);
            throw error;
        }
    },
};

const __getDepartmentModelByName = async (name: string) => {
    const department = await Department.findOne({
        where: { name: name },
        include: [
            { association: Department.associations.director },
            { association: Department.associations.viceDirector },
            { association: Department.associations.members },
        ]
    });

    if (!department) return null;
    return department;
}

const __getAllDepartmentModels = async () => {
    const results = await Department.findAll({
        include: [
            { association: Department.associations.director },
            { association: Department.associations.viceDirector },
            { association: Department.associations.members },
        ]
    });
    return results;
}

const __mapDepartmentModelToEntity = (department: Department): DepartmentEntity => {
    return {
        name: department.name,
        creationDate: new Date(department.creationDate),
        directorId: department.director?.memberId,
        viceDirectorId: department.viceDirector?.memberId,
    }
};

export default ServicesDepartmentRepository;