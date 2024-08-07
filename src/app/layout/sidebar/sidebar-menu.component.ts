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
                displayName: 'Item Supplier',
                route: '/master/item-supplier',
                childName: 'item supplier',
            },
            {
                displayName: 'Menu',
                route: '/master/menu',
                childName: 'menu',
            },
            {
                displayName: 'Modifier',
                route: '/master/modifier/modifier-item',
                childName: 'Modifier Item',
            },
            {
                displayName: 'Outlet',
                route: '/master/outlet',
                childName: 'outlet',
            },
            {
                displayName: 'Payment',
                route: '/master/payment',
                childName: 'payment',
            },

            {
                displayName: 'Price',
                route: '/master/price',
                childName: 'Price',
            },
            {
                displayName: 'Recipe',
                route: '/master/recipe/recipe-header',
                childName: 'recipe header',
            },
            {
                displayName: 'Supplier',
                route: '/master/supplier',
                childName: 'supplier',
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
