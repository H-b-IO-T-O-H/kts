import React, {useState} from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import "./Header.scss"
import {Link} from "react-router-dom";
import Timer from "@components/Timer";
import Avatar from "@media/Musya.png"

const Header = () => {
    const [collapseIsOpen, collapseChange] = useState(false);

    const toggleCollapse = () => {
        collapseChange(!collapseIsOpen);
    };

    return (
        <div className="navbar__main">
            <MDBNavbar className="mb-3" color="teal lighten-2" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Navbar</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse}/>
                <MDBCollapse id="navbarCollapse3" isOpen={collapseIsOpen} navbar>
                    <MDBNavbarNav left className="col-lg-8">
                        <MDBNavItem active>
                            <MDBNavLink to="/posts">Главная</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className="d-md-none ">
                            <MDBNavLink to="#!">Личный кабинет</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem active>
                            <MDBNavLink to="/post/create">Создать пост</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right className=" d-none d-md-block">
                        <div
                            className="d-flex align-items-center justify-content-end flex-nowrap">
                            <MDBNavItem>
                                <img className="navbar__avatar"
                                     src={Avatar} alt="oops"/>
                            </MDBNavItem>
                            <MDBNavItem
                                className="container-fluid flex-column justify-content-center text-center">
                                <span className="main__title">Кошка Муся</span>
                                <Timer onZero={() => {console.log("stop")}}/>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle className="dropdown-toggle navbar__dropdown">
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu right basic>
                                        <Link to="/profile">
                                            <MDBDropdownItem>Профиль</MDBDropdownItem>
                                        </Link>
                                        <MDBDropdownItem>Расписание</MDBDropdownItem>
                                        <Link to="/plan">
                                            <MDBDropdownItem>Учебный план</MDBDropdownItem>
                                        </Link>
                                        <MDBDropdownItem onClick={() => {
                                            //Logout(this.props.history)
                                        }}>Выйти</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </div>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </div>
    );
}

export default Header;