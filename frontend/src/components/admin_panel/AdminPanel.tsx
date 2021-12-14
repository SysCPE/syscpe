import { Grid, Grow, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DepartmentsTableComponent from 'components/departments_table/DepartmentsTableComponent';
import MembersTableComponent from 'components/members_table/MembersTableComponent';
import { useState } from 'react';

type Tab = 'MEMBRO' | 'DEPARTAMENTO' | 'GRUPO_DE_TRABALHO';

const AdminPanel = () => {
  const [tab, setTab] = useState<Tab>('MEMBRO');

  return (
    <Grid container sx={{ padding: 3 }} justifyContent="center">
      <Grid container item xs={12} sm={11} md={10} lg={9} direction="column">
        <Grid item sx={{ marginBottom: 2 }}>
          <Grow in={true}>
            <ToggleButtonGroup
              exclusive={true}
              value={tab}
              onChange={(_, newValue) => {
                if (newValue === null) return;
                if (newValue === tab) return;
                setTab(newValue);
              }}
              color="secondary"
            >
              <ToggleButton value="MEMBRO">Membros</ToggleButton>
              <ToggleButton value="DEPARTAMENTO">Departamentos</ToggleButton>
              <ToggleButton value="GRUPO_DE_TRABALHO">
                Grupos de Trabalho
              </ToggleButton>
            </ToggleButtonGroup>
          </Grow>
        </Grid>

        <Grid item>
          {tab === 'MEMBRO' && <MembersTableComponent />}
          {tab === 'DEPARTAMENTO' && <DepartmentsTableComponent />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
