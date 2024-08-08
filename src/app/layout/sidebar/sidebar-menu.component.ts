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
                displayName: 'Color',
                route: '/master/color',
                childName: 'color',
            },
            {
                displayName: 'Discount',
                route: '/master/discount/discount-method',
                childName: 'discount',
            },
            {
                displayName: 'Donate',
                route: '/master/donate/donate-method',
                childName: 'donate',
            },
            {
                displayName: 'Global',
                route: '/master/global',
                childName: 'global',
            },
            {
                displayName: 'Group Item',
                route: '/master/group-item',
                childName: 'group item',
            },
            {
                displayName: 'Item',
                route: '/master/item',
                childName: 'item',
            },
            {
                displayName: 'Level',
                route: '/master/level/level-one',
                childName: 'level',
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
                displayName: 'MPCS',
                route: '/master/mpcs/mpcs-detail',
                childName: 'mpcs',
            },
            {
                displayName: 'Outlet',
                route: '/master/outlet',
                childName: 'outlet',
            },
            {
                displayName: 'Payment',
                route: '/master/payment/payment-method',
                childName: 'payment',
            },
            {
                displayName: 'Price',
                route: '/master/price',
                childName: 'Price',
            },
            {
                displayName: 'Recipe',
                route: '/master/recipe/recipe-detail',
                childName: 'recipe',
            },
            {
                displayName: 'Sales Recipe',
                route: '/master/sales-recipe',
                childName: 'sales',
            },
            {
                displayName: 'Supplier',
                route: '/master/supplier',
                childName: 'supplier',
            },
            
        ]

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
    {
        displayName: 'Monitoring',
        icon: 'monitor_heart',
        parentName: 'monitoring',
        children: [
            {
                displayName: 'Outlet',
                route: '/monitoring/outlet',
                childName: 'monitoring-outlet',
            },
        ],
    },

    // Add More Menu With or Without Children Menu
];
