import React from 'react'
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';

const Footer = () => (
	<div className="footer">
       <Navbar color="dark" dark>
            <Nav navbar>
              <NavItem>
              	Тестовое задание №3 | Автор: rostislav.futornoy@gmail.com | Telegram: @termoxin
              </NavItem>
            </Nav>
        </Navbar>
    </div>
)

export default Footer