/* eslint-disable arrow-body-style */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Grid, Row } from 'rsuite';

import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <h1 className="text-blue titlepadding text-center ">Chat App</h1>
        <h6 className="text-black-45 text-center mb-2">
          Created by Virender Singh
        </h6>

        <Grid fluid>
          <Row className="show-grid mb-2">
            <Col xs={12}>
              <DashboardToggle />
            </Col>
            <Col xs={12}>
              <CreateRoomBtnModal />
            </Col>
          </Row>
        </Grid>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
