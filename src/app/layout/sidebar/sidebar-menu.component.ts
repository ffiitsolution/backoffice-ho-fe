import { SidebarMenu } from "./sidebar.model";

export const navItems: SidebarMenu[] = [
  {
    displayName: 'Home',
    icon: 'dashboard',
    route: '/home',
    parentName: 'home'
  },
  {
    displayName: 'Master',
    parentName: 'master',
    icon: 'data_usage',
    children: [
      { displayName: 'Dashboard', route: '/master/dashboard', childName: 'dashboard' },
      { displayName: 'Global', route: '/master/global', childName: 'global' },
      { displayName: 'Outlet', route: '/master/outlet', childName: 'outlet' },
      { displayName: 'Menu Item', route: '/master/menu-item', childName: 'menu-item' },
      { displayName: 'Menu Item Limit', route: '/master/menu-item-limit', childName: 'menu-item-limit' },
      { displayName: 'Menu Item Schedule', route: '/master/menu-item-schedule', childName: 'menu-item-schedule' },
      { displayName: 'Menu Set', route: '/master/menu-set', childName: 'menu-set' },
      { displayName: 'Modifier Item', route: '/master/modifier-item', childName: 'modifier-item' },
      { displayName: 'MPCS Header', route: '/master/mpcs-header', childName: 'mpcs-header' },
      { displayName: 'MPCS Detail', route: '/master/mpcs-detail', childName: 'mpcs-detail' },
      { displayName: 'Supplier', route: '/master/supplier', childName: 'supplier' },
      { displayName: 'Item Supplier', route: '/master/item-supplier', childName: 'item-supplier' }
    ]
  },
  {
    displayName: 'Transaction',
    icon: 'compare_arrows',
    parentName: 'transaction',
    children: [
      { displayName: 'Dashboard', route: '/child3', childName: 'dashboard' },
      { displayName: 'Kirim Data Master', route: '/child4', childName: 'kirim data master' }
    ]
  },
  {
    displayName: 'Report',
    icon: 'insert_drive_file',
    parentName: 'report',
    children: [
      { displayName: 'Report HQ', route: '/child3', childName: 'report headquarters' },
      { displayName: 'Report Log', route: '/child4', childName: 'report log' }
    ]
  }

  // Add More Menu With or Without Children Menu
];
