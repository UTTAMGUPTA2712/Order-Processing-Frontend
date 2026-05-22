'use client'
import { ElementType, FC } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import styles from './navlink.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useSidebarContext } from '@/context';
import { usePathname } from 'next/navigation';

interface NavlinkProps {
  to: string;
  Icon: ElementType;
  text: string;
}

export const Navlink: FC<NavlinkProps> = (props) => {
  const { to, Icon, text } = props;
  const pathname = usePathname();
  const isActive = pathname.split('/')[1] === to;
  const { sidebarToggle, closeSidebar } = useSidebarContext();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('sm'));

  const handleNavClick = () => {
    if(!desktopView) closeSidebar();
  }
  
  return (
    <Link className={clsx(styles.navlink, isActive && styles.active, sidebarToggle ? styles.opened : styles.closed)} href={`/${to}`}
      onClick={handleNavClick}>
      <ListItemButton selected={isActive} className={styles.button}>
        <ListItemIcon className={styles.navlinkitem}><Icon color='secondary' className={styles['navlink-icon']} /></ListItemIcon>
        <ListItemText primary={(`${text}`)} className={styles.text} />
      </ListItemButton>
    </Link>
  );
};