import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { FC, Fragment, MouseEvent, useState } from 'react';
import useMemberDelete from './useMemberDelete';

type Props = { member: MemberEntity };
const MemberDeleteMenuComponent: FC<Props> = ({ member }) => {
  const { loading, submit } = useMemberDelete(member);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = !!anchorEl;

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const onDeleteMember = () => {
    submit();
    closeMenu();
  };

  return (
    <Fragment>
      <Menu
        open={open}
        onClose={closeMenu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        <MenuItem onClick={onDeleteMember}>
          <Typography variant="body1">
            Clique novamente para <b>remover</b> este membro
          </Typography>
        </MenuItem>
      </Menu>

      <div style={{ display: 'relative' }}>
        <Tooltip title="Deletar">
          <IconButton
            size="small"
            onClick={openMenu}
            color="error"
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                sx={{ position: 'absolute' }}
                size={24}
                color="error"
              />
            )}
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </Fragment>
  );
};

export default MemberDeleteMenuComponent;
