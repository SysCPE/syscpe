type AdminMemberData = {
  idCPE: number;
  email: string;
  name: string;

  status: string;
  departmentName?: string;
  workgroups: string[];

  CPF: string;
  RG: string;
  pronoun: string;
  socialName: string;
  birthday: string;

  course: string;
  semester: number;
  period: string; // 'Diurno', 'Noturno', 'Integral'?
};

export default AdminMemberData;
