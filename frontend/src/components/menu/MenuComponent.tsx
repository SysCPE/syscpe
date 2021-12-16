import { Menu } from '@mui/material';
import { FC, Fragment, MouseEvent, MouseEventHandler, useState } from 'react';

type Props = {
  renderMenu: (onClose: VoidFunction) => JSX.Element;
  renderButton: (onOpen: MouseEventHandler<HTMLButtonElement>) => JSX.Element;
};
const MenuComponent: FC<Props> = ({ renderMenu, renderButton }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = !!anchorEl;

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  return (
    <Fragment>
      <Menu
        open={open}
        onClose={closeMenu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        {renderMenu(closeMenu)}
      </Menu>

      {renderButton(openMenu)}
    </Fragment>
  );
};

export default MenuComponent;
