import DepartmentEntity from "domain/entities/department_entity";


export const mockDepartments: { [key: string]: DepartmentEntity } = {
    'inovaTec': {
        name: 'inovaTec',
        creationDate: new Date(2005, 4, 15),
    },
    'Gestão de Pessoas': {
        name: 'Gestão de Pessoas',
        creationDate: new Date(2020, 12, 12),
    }
}