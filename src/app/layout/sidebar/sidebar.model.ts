export interface SidebarMenu {
    displayName: string;
    parentName?: string;
    icon?: string;
    route?: string;
    navCap?: string;
    children?: SidebarSideMenu[];
    expanded?: boolean; // Add expanded property to track the expanded state
}

export interface SidebarSideMenu {
    displayName: string;
    route: string;
    childName: string;
}