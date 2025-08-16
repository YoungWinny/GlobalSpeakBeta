// import React from 'react';
// import {Outlet} from 'react-router-dom'

// function Layout(){
//     return (
//         <div>
//             <Outlet />
//         </div>
//     )
// }

// export default Layout;









import React from 'react';
import { Outlet } from 'react-router-dom';
import AIAssistantSidebar from '../components/shared/AIAssistantSidebar';

// Base layout (used for auth and basic pages)
export function BaseLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// Creator layout (uses AI sidebar)
export function CreatorLayout() {
  return (
    <div className="flex h-screen">
      <AIAssistantSidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  );
}

// Learning layout (simple full-page layout)
export function LearningLayout() {
  return (
    <div className="h-screen overflow-y-auto">
      <Outlet />
    </div>
  );
}

export default BaseLayout;