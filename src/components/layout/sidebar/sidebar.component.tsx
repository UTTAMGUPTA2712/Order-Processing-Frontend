'use client'

import Image from 'next/image';
import { Box, Stack, Typography, List, useMediaQuery } from '@mui/material';
import { useSidebarContext } from '@/context/sidebar.context';
import { Navlink } from '@/components/layout/navlink';
import styles from './sidebar.module.scss'
import theme from '@/theme/theme';
import { Inventory2, ShoppingBag } from '@mui/icons-material';

const Sidebar = () => {

  const { closeSidebar, sidebarToggle } = useSidebarContext();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const handelEventPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.sidebarLayer)) closeSidebar();
    if (mobileView && target.closest(styles.navlink)) closeSidebar();
  };

  return (
    <Box className={`${styles.sidebarLayer} ${sidebarToggle ? styles.opened : styles.closed}`} onClick={handelEventPropagation}>
      <Box className={`${styles.sidebar} ${sidebarToggle ? styles.opened : styles.closed}`}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Stack direction="row" alignItems="center" padding='8px 16px'>
            <Box className={styles['logo-box']}>
              <Image src='/logo.svg' alt='logo' width={24} height={24} />
            </Box>
            <Typography variant='titleSm' fontWeight='fontWeightMedium'>Hackathon App</Typography>
          </Stack>
        </Box>
        <List component="nav">
          <Navlink to="products" Icon={Inventory2} text='Products' />
          <Navlink to="orders" Icon={ShoppingBag} text='Orders' />
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar