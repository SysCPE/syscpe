import WorkGroupEntity from "domain/entities/work_group_entity";

export const mockWorkGroups: { [key: string]: WorkGroupEntity } = {
    'Apostilas': {
        name: 'Apostilas',
        description: 'Grupo Criado para fornecer apostilas para os alunos',
        creationDate: new Date(2020, 5, 9),
    },
    'Dados': {
        name: 'Dados',
        description: 'Responsavel pelo SysCPE s2',
        creationDate: new Date(2020, 12, 8),
    },   
    'PSEL-2021': {
        name: 'PSEL-2021',
        creationDate: new Date(2021, 5, 5),
    },
}