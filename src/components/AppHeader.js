import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/auth/action/actionCreate";
import { connect } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu, cilAccountLogout } from "@coreui/icons";

import { logo } from "src/assets/brand/logo";

const AppHeader = ({ logout }) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.gui.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <div className="header2">SPL Automation</div>
        </CHeaderBrand>

        <CHeaderNav>
          <CNavItem></CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CNavLink href="#" onClick={() => logout()}>
            <CIcon icon={cilAccountLogout} size="lg" /> Logout
          </CNavLink>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(AppHeader);
