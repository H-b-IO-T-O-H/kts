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
import {useHistory, useLocation} from "react-router-dom";
import Timer from "@components/Timer";
import Avatar from "@media/Musya.png"
import {Urls} from "@config/urls";
import {Logout} from "../../App/pages/authorization";


const Header = () => {
    const location = useLocation();
    const history = useHistory();

    const Rendered = () => ([Urls.timetableCreate, Urls.home, Urls.root].includes(location.pathname))

    const [collapseIsOpen, collapseChange] = useState(false);

    const toggleCollapse = () => {
        collapseChange(!collapseIsOpen);
    };

    return (
        <div>
            {Rendered() ? <div className="navbar__main">
                <MDBNavbar className="mb-3" color="teal lighten-2" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">Navbar</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={toggleCollapse}/>
                    <MDBCollapse id="navbarCollapse3" isOpen={collapseIsOpen} navbar>
                        <MDBNavbarNav left className="col-lg-8">
                            <MDBNavItem active>
                                <MDBNavLink to={Urls.home}>Главная</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="d-md-none ">
                                <MDBNavLink to="#!">Личный кабинет</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active>
                                <MDBNavLink to={Urls.timetableCreate}>Конструктор расписания</MDBNavLink>
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
                                    <div className="text-black-50">
                                        <Timer size={{sm: true}} onZero={() => {
                                            Logout(history);
                                        }}/>
                                    </div>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle className="dropdown-toggle navbar__dropdown">
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu right basic>
                                            <MDBDropdownItem onClick={() => {
                                                Logout(history);
                                            }}>Выйти</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </div>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div> : null}
        </div>
    );
}

export default Header;

