import tkdbImage from "../images/overlap.png"
import LoginCard from "./LoginCard"
import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import { signOut } from "firebase/auth";

export default function Header({auth, documentTitle}){
    const [showHamNav, setShowHamNav] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showLogin, setShowLogin] = useState(false)
    let navigate = useNavigate();

    window.addEventListener("resize", ()=>{
        setWindowWidth(window.innerWidth)
    })

    ///Shows Login card
    function loginClickListener(){
        if(document.title != "Signup"){
            setShowLogin(prev => !prev)
        }
        document.getElementById('nav-ham').style.display = "none"
    }
    ///Goes to home page and blog
    function goHome(){
        navigate("/")
    }
    ///Displays HamNav if the page innerWidth is =< 500
    function showHamNavFunction(){
        setShowHamNav(prev => !prev)
        if(showHamNav){
            document.getElementById('nav-ham').style.display = "flex"
        }else{
            document.getElementById('nav-ham').style.display = "none"
        }
    }


    function handleSignOut(){
        signOut(auth)

        window.location.reload()    
    }
   
    // console.log(auth?.currentUser)
    return(//shows header and login card
        <div className="navbar"> 
            <img alt="Cannot find Image" onClick={goHome} className="logo" src={tkdbImage} />
            <h1 className="title">{documentTitle}</h1>
            {showLogin ? <LoginCard auth={auth}/> : null}
                {/* Conditional rendering for hamNav */}
                {windowWidth > 500 ? 
                <div className="nav--right">
                    <Link to="/blog" className="desktop-navbar blog-tab nav-tabs">Blog</Link>
                    <Link to="/events" className="desktop-navbar events-tab nav-tabs">Events</Link>
                    {auth?.currentUser ? <p className="loggedin-email desktop-navbar nav-tabs">{auth?.currentUser?.displayName ? auth?.currentUser?.displayName : auth?.currentUser?.email}</p> :<h4 onClick={loginClickListener} className="desktop-navbar login-tab nav-tabs">Login</h4>}
                    {auth?.currentUser ? <button onClick={handleSignOut}>Sign Out</button> : null}
                </div>
                :
            // Phone Nav 
                <img onClick={showHamNavFunction} className="nav-hamburger nav--right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" alt="not here" />}
            <div id="nav-ham" className="nav-ham">
                {auth?.currentUser ? <p className="nav-tabs">{auth?.currentUser?.displayName ? auth?.currentUser?.displayName : auth?.currentUser?.email}</p> : null}
                {auth?.currentUser ? null : <h4 onClick={loginClickListener} className="login-tab nav-tabs">Login</h4>}
                <Link to="/blog" className="blog-tab nav-tabs">Blog</Link>
                <Link to="/events" className="events-tab nav-tabs">Events</Link>
                {auth?.currentUser ? <button className="logout-button" onClick={handleSignOut}>Sign Out</button> : null}
            </div>
        </div>
    )
}