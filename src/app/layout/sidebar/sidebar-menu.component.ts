import { SidebarMenu } from "./sidebar.model"; 

export const navItems: SidebarMenu[] = [
  {
    displayName: 'Home',
    icon: 'dashboard',
    route: '/home'
  },
  {
    displayName: 'Master',
    icon: 'data_usage',
    children: [
      { displayName: 'Dashboard', route: '/child1' },
      { displayName: 'Global', route: '/child2' }
    ]
  },
  {
    displayName: 'Transaction',
    icon: 'compare_arrows',
    children: [
      { displayName: 'Dashboard', route: '/child3' },
      { displayName: 'Kirim Data Master', route: '/child4' }
    ]
  },
  {
    displayName: 'Report',
    icon: 'insert_drive_file',
    children: [
      { displayName: 'Report HQ', route: '/child3' },
      { displayName: 'Report Log', route: '/child4' }
    ]
  }
  
  // Add More Menu With or Without Children Menu
];