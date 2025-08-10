const navigationItems = [
    {
        main: 'Inventory',
        links: [
            {
                name: 'Overview',
                route: 'products',
            },
            {
                name: 'Actions',
                children: [
                ]
            },
            {
                name: 'Products',
                children: [
                    {
                        name: 'Products',
                        route: 'products',
                    },
                    {
                        name: 'Product Categories',
                        route: 'products',
                    },
                ]
            },
            {
                name: 'Reporting',
                children: [
                ]
            },
            {
                name: 'Configuration',
                children: [
                ]
            },
        ]
    },
    {
        main: 'Bookings',
        links: [
            {
                name: 'Overview',
                route: 'bookings',
            },
            {
                name: 'Bookings',
                children: [
                    {
                        name: 'Bookings',
                        route: 'bookings',
                    },
                    {
                        name: 'Customers',
                        route: 'bookings',
                    },
                ]
            },
            {
                name: 'Reporting',
                children: [
                ]
            },
            {
                name: 'Configuration',
                children: [
                ]
            },
        ]
    },
    {
        main: 'Hotel Management',
        links: [
            {
                name: 'Rooms',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                children: [
                    {
                        name: 'All Rooms',
                        route: 'dashboard',
                        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',
                        description: 'View and manage all rooms'
                    },
                    {
                        name: 'Room Types',
                        route: 'dashboard',
                        icon: 'M19 11H5m14-4H5m4 8H5m4 4H5',
                        description: 'Manage room types and pricing'
                    },
                    {
                        name: 'Housekeeping',
                        route: 'dashboard',
                        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                        description: 'Room cleaning and maintenance status'
                    }
                ]
            },
            {
                name: 'Guests',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
                children: [
                    {
                        name: 'All Guests',
                        route: 'dashboard',
                        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                        description: 'View and manage guest profiles'
                    },
                    {
                        name: 'Add Guest',
                        route: 'dashboard',
                        icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
                        description: 'Register a new guest'
                    }
                ]
            }
        ]
    },
    {
        main: 'Financial',
        links: [
            {
                name: 'Accounting',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                children: [
                    {
                        name: 'Invoices',
                        route: 'dashboard',
                        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                        description: 'Manage customer invoices'
                    },
                    {
                        name: 'Payments',
                        route: 'dashboard',
                        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
                        description: 'Track payments and transactions'
                    }
                ]
            },
            {
                name: 'POS',
                icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                children: [
                    {
                        name: 'Sales Terminal',
                        route: 'dashboard',
                        icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                        description: 'Point of sale terminal'
                    },
                    {
                        name: 'Sales History',
                        route: 'dashboard',
                        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                        description: 'View sales transactions'
                    }
                ]
            },
            {
                name: 'Reports',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                children: [
                    {
                        name: 'Financial Reports',
                        route: 'dashboard',
                        icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                        description: 'Generate financial reports'
                    },
                    {
                        name: 'Custom Reports',
                        route: 'dashboard',
                        icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                        description: 'Create custom reports'
                    }
                ]
            }
        ]
    }
];

export const getNavigationItems = (mainCategory = 'Inventory', userRole = 'admin') => {
    const category = navigationItems.find(item => item.main === mainCategory);

    if (!category) {
        console.warn(`Category '${mainCategory}' not found`);
        return [];
    }

    let links = category.links;

    switch (userRole) {
        case 'admin':
            return links;
        case 'manager':
            return links.filter(link =>
                !['Settings', 'User Management'].includes(link.name)
            );
        case 'staff':
            return links.filter(link =>
                ['Overview', 'Bookings', 'Rooms', 'Guests', 'POS'].includes(link.name)
            );
        default:
            return links;
    }
};

export const getMainCategories = () => {
    return navigationItems.map(item => item.main);
};

export const getInventoryNavItems = (userRole = 'admin') => {
    return getNavigationItems('Inventory', userRole);
};

export const getHotelManagementNavItems = (userRole = 'admin') => {
    return getNavigationItems('Hotel Management', userRole);
};

export const getFinancialNavItems = (userRole = 'admin') => {
    return getNavigationItems('Financial', userRole);
};

export const getBookingNavItems = (userRole = 'admin') => {
    return getNavigationItems('Bookings', userRole);
};

export const getAccountingNavItems = () => {
    const allLinks = navigationItems.flatMap(item => item.links);
    return allLinks.filter(link => ['Accounting', 'Reports'].includes(link.name));
};

export { navigationItems };

export default {
    navigationItems,
    getNavigationItems,
    getMainCategories,
    getInventoryNavItems,
    getHotelManagementNavItems,
    getFinancialNavItems,
    getBookingNavItems,
    getAccountingNavItems
};
