/* eslint-disable arrow-body-style */
import React from 'react';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div>
      <div>
        <DashboardToggle />
        <CreateRoomBtnModal />
      </div>
      bottom
    </div>
  );
};

export default Sidebar;
