import { SidebarMenu } from './sidebar.model';

export const navItems: SidebarMenu[] = [
    {
        displayName: 'Home',
        icon: 'dashboard',
        route: '/home',
        parentName: 'home',
    },
    {
        displayName: 'Master',
        parentName: 'master',
        icon: 'data_usage',
        children: [
            {
                displayName: 'Dashboard',
                route: '/master/dashboard',
                childName: 'dashboard-master',
            },
            {
                displayName: 'Global',
                route: '/master/global',
                childName: 'global',
            },
            {
                displayName: 'Outlet',
                route: '/master/outlet',
                childName: 'outlet',
            },
            {
                displayName: 'Menu',
                route: '/master/menu',
                childName: 'menu',
            },
            {
                displayName: 'Modifier Item',
                route: '/master/modifier-item',
                childName: 'modifier item',
            },
            // {
            //     displayName: 'MPCS Header',
            //     route: '/master/mpcs-header',
            //     childName: 'mpcs header',
            // },
            // {
            //     displayName: 'MPCS Detail',
            //     route: '/master/mpcs-detail',
            //     childName: 'mpcs detail',
            // },
            {
                displayName: 'Payment',
                route: '/master/payment',
                childName: 'payment',
            },
            {
                displayName: 'Supplier',
                route: '/master/supplier',
                childName: 'supplier',
            },
            {
                displayName: 'Item Supplier',
                route: '/master/item-supplier',
                childName: 'item supplier',
            },
            {
                displayName: 'Recipe',
                route: '/master/recipe/recipe-header',
                childName: 'recipe header',
            },
            {
                displayName: 'Modifier Price',
                route: '/master/modifier-price',
                childName: 'Modifier Price',
            },
            {
                displayName: 'Price',
                route: '/master/price',
                childName: 'Price',
            },
        ],
    },
    {
        displayName: 'Transaction',
        icon: 'compare_arrows',
        parentName: 'transaction',
        children: [
            {
                displayName: 'Dashboard',
                route: '/transaction/dashboard',
                childName: 'dashboard-transaction',
            },
        ],
    },
    {
        displayName: 'Report',
        icon: 'insert_drive_file',
        parentName: 'report',
        children: [
            {
                displayName: 'All Report',
                route: '/report/all',
                childName: 'all-report',
            },
            {
                displayName: 'Send Master',
                route: '/report/send-master',
                childName: 'send-master',
            },
        ],
    },

    // Add More Menu With or Without Children Menu
];
