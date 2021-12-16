type DepartmentEntity = {
  id: string;

  name: string;
  directorId?: number;
  viceDirectorId?: number;
  description: string;

  creationDate: Date;
};

export default DepartmentEntity;
