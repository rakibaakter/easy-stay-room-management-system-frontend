import DashboardNavber from '@/components/dashboard/dashboardNavber';
import React from 'react';

const layout = ({children}) => {
    
    return (
        <div>
         <DashboardNavber/> 
           {children}
        </div>
    );
};

export default layout;