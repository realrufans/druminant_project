import { userState } from "@/atom"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaHome } from "react-icons/fa"
import { IoIosLogIn, IoIosLogOut } from "react-icons/io"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

function ModuleHeader() {
    const [activateIcon, setactivateIcon] = useState(false)
    const [hamburg, setHamburg] = useState(true)
    const [cancel, setCancel] = useState(false)
    const router = useRouter()

    function dropNav() {
        setactivateIcon(true);
        setCancel(true)
        setHamburg(false)
    }
    function hideNav() {
        setactivateIcon(false);
        setCancel(false)
        setHamburg(true)
    }

    //change the link component to a p tag, create a fucntion that when a user clicks on the p tag, it clears the local storage and redirects the 
    //user back to home page
    const [userFromLocalStorage, setUserFromLocalStorage] = useRecoilState(userState);


    useEffect(() => {
        // This code runs only on the client side
        const user = window.localStorage.getItem('user');
        setUserFromLocalStorage(JSON.parse(user))

    }, []);

    function logOut() {
        localStorage.removeItem('user')
        setUserFromLocalStorage(null)
        router.push('/')
        toast("Bye!")

    }

    const currentPath = router.asPath





    return (<div>
        <div
            className={`admin-header ${currentPath === "/" || currentPath === "/login" || currentPath === "/signup" ? "bg-transparent" : ""}`}
            style={{ backgroundColor: currentPath !== "/" && currentPath !== "/login" && currentPath !== "/signup" ? "#008000" : "transparent" }}
        >
            <div>
                <Link href={"/"}>
                    <Image width={100} height={100} alt="Home" src="/image/newlogo.png" title="Home" className="main-image-laptop" />
                </Link>
            </div>

            <div className="module-nav-list">
                <ul>
                    <li className={router.pathname === "/" ? "active" : ""}>
                        <Link href={"/"} className="menu-nav2" title="Home">Home</Link>
                    </li>
                    <li className={router.pathname === "/dashboard" ? "active" : ""}>
                        <Link href={"/dashboard"} className="menu-nav2" title="View dashboard">Dashboard</Link>
                    </li>
                    <li className={router.pathname === "/profile" ? "active" : ""}>
                        <Link href={"/profile"} className="menu-nav2" title="View and edit profile">Profile</Link>
                    </li>
                    <li className={router.pathname === "/help" ? "active" : ""}>
                        <Link href={"/help"} className="menu-nav2" title="Get help">Help</Link>
                    </li>
                    {userFromLocalStorage?.isAdmin && (
                        <>
                            <li className={router.pathname === "/request" ? "active" : ""}>
                                <Link href={"/request"} className="menu-nav2" title="View staff requests">Requests</Link>
                            </li>
                            <li className={router.pathname === "/staffinfo" ? "active" : ""}>
                                <Link href={"/staffinfo"} className="menu-nav2" title="Staff information">Staff</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {userFromLocalStorage ? <div>
                <p onClick={logOut}><IoIosLogOut className="log-out" title="Log out" /></p>
            </div> : <div>
                <Link href={"/login"} className="log-out2">Log In</Link>
            </div>}
        </div>

        {/* <div
            className={`admin-header ${currentPath === "/" || currentPath === "/login" || currentPath === "/signup" ? "bg-transparent" : ""}`}
            style={{ backgroundColor: currentPath !== "/" && currentPath !== "/login" && currentPath !== "/signup" ? "#008000" : "transparent" }}
        > */}

        <div className="mobile-header">

            
            <Link href={"/"}>
                <Image src="/image/mobilelogo.png" alt="Home"  width={40} height={70} className="main-image" style={{ height: "35px"}} />
            </Link>
            {hamburg && (
                <Link className="link1" href={"#"}><p onClick={dropNav} className="icon1">&#9776;</p></Link>
            )}
            {cancel && (
                <Link className="link1" href={"#"}><p style={{ paddingTop: "12px" }} onClick={hideNav} className="icon1"><AiOutlineClose /></p></Link>
            )}
        </div>

        {activateIcon && (
            <div className="module-drop">
                <ul className="dropDownList-md">
                    <li><Link href={"/"} className="menu-nav2">Home</Link></li>
                    <li><Link href={"/dashboard"} className="menu-nav2">Dashboard</Link></li>
                    <li><Link href={"#"} className="menu-nav2">Profile</Link></li>
                    <li><Link href={"/help"} className="menu-nav2">Help</Link></li>
                    {userFromLocalStorage?.isAdmin && (
                        <>
                            <li><Link href={"/request"} className="menu-nav2">Requests</Link></li>
                            <li><Link href={"/staffinfo"} className="menu-nav2">Staff</Link></li>
                        </>
                    )}
                    <li style={{ borderBottom: "none", cursor: "pointer" }}><p onClick={logOut} className="menu-nav2">Log out</p></li>
                </ul>
            </div>
        )}
    </div>
    );
}

export default ModuleHeader;