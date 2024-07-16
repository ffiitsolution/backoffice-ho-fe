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
      { displayName: 'Outlet', route: '/master/outlet', childName: 'outlet' }
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