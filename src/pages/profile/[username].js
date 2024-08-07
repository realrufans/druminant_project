import { newUserToken, userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import { refreshToken } from "@/helperFunctions/fetchUserAndGenerateToken";
import { data } from "autoprefixer";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { MdCancel, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";

function Profile() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userState);
  const [profileData, setProfileData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [newToken, setnewToken] = useRecoilState(newUserToken);
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const refreshTOkenCallBack = async () => {
    const refreshedToken = await refreshToken(userData);

    if (refreshedToken) {
      setnewToken(refreshedToken);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };
  function logOut() {
    if (userData?.username !== profileData?.username)
      return toast.warn("Please login into your account to proceed");
    confirm("Are you sure you want to log out?");
    localStorage.removeItem("token");
    setUserData(null);
    setProfileData(null);
    toast.success("You are logged out!");
  }

  const INPUT_CLASS =
    "w-full px-3 py-2  rounded-lg border focus:outline-none focus:ring focus:ring-primary  text-black";
  const BUTTON_CLASS =
    "bg-primary text-primary-foreground w-full py-2 rounded-lg hover:bg-primary/80 bg-[#221c7a] flex item-center justify-center space-x-2";

  async function UpdateProfile(e) {
    e.preventDefault();

    //     npx create-next-app@latest --tailwind harnah-empire
    // cd harnah-empire

    const { email, password, username } = formData;

    const updateData = {};
    if (username !== "") updateData["username"] = username;
    if (email !== "") updateData["email"] = email;
    if (password !== "") updateData["password"] = password;

    if (userData) {
      console.log("linde 72", userData);
      try {
        setEditing(true);

        const res = await axios.patch(
          `${BASE_URL}/profile/${router.query.username}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
        if (res.data.message) {
          console.log(userData, "from 84");
          refreshTOkenCallBack();
          if (updateData.username) {
            router.push(`/profile/${username}`);
          }
          setEditing(false);
          setEditProfile(false);
          toast.success(res.data.message.text);
        }
      } catch (error) {
        console.log(error);
        setEditing(false);
        if (error.code === "ERR_NETWORK") {
          toast.error(error.message + ", Please try again later!");
        }

        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        }
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Pleae login!");
    }
  }

  useEffect(() => {
    setfetching(true);
    if (userData && router.isReady) {
      axios
        .get(`${BASE_URL}/profile/${router.query.username}`, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        })
        .then((res) => {
          setProfileData(res.data.message);
          setfetching(false);
        })
        .catch((err) => {
          setfetching(false);
          console.log(err);

          if (err.code === "ERR_NETWORK") {
            return toast.error("Network error, please again later!");
          }
          if (err.response.data) {
            setFetchError(err.response.data.message);
            toast.error(err.response.data.message);
          }
        });
    }
  }, [userData, router.isReady, newToken, router.query.username]);

  return (
    <div className="">
      <div
        id="dashboard-main"
        onClick={(e) => setEditProfile(false)}
        className="dashboard-main text-white relative  "
      >
        <Head>
          <title>Druminant - Profile</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/image/mobilelogo.png"
          />
        </Head>
        <ModuleHeader />

        {userData === null && (
          <div className="text-center mx-0 h-screen  flex items-center  justify-center">
            <div className="flex items-center text-white justify-center flex-col">
              <p className="dashboard-mssg">
                You are not logged in! <br />
                Please, log in to access profile
              </p>
              <Link href={"/login"} className="mss-login">
                login
              </Link>
            </div>
          </div>
        )}
        <div className="">
          {editProfile && (
            <div
              className="    absolute   mx-2   mt-28 right-0 left-0    md:mt-32  "
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={(e) => UpdateProfile(e)}
                className=" border-[1px] border-gray-500  shadow-lg rounded-lg p-8 flex flex-col   mx-auto  sm:w-96 lg:w-[500px]"
              >
                <div className="flex justify-between">
                  {" "}
                  <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>{" "}
                  <div>
                    <MdClose
                      className="cursor-pointer text-2xl"
                      onClick={() => setEditProfile(false)}
                    />
                  </div>
                </div>
                <FaUser class="w-10 h-10 text-[white] mt-8 rounded-full mx-auto" />
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="username"
                    name="username"
                    placeholder={userData?.username}
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder={"john.doe@example.com"}
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="min of 6 characters"
                    className={INPUT_CLASS}
                  />
                </div>
                <button type="submit" className={BUTTON_CLASS}>
                  {editing ? (
                    <>
                      {" "}
                      <AiOutlineLoading3Quarters className="text-white text-2xl animate-spin " />{" "}
                      <p> Processing</p>
                    </>
                  ) : (
                    "  Save Changes"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {fetching && userData && (
          <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
            </div>
          </div>
        )}
        {profileData && !editProfile && !fetching ? (
          <div class="  max-w-lg mx-auto  my-10 md:my-20   rounded-lg shadow-md p-5">
            <h1
              className=" text-white -mt-10 text-center mb-16 md:mt-0"
              style={{
                fontFamily: "verdana",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              User Profile
            </h1>
            {/* <Image class="w-32 h-32 rounded-full mx-auto" width={100} height={100} src="https://picsum.photos/200" alt="Profile picture"/> */}
            <FaUser class="w-32 h-32 text-[white] mt-8 rounded-full mx-auto" />
            <div className="flex flex-col     ">
              <h2 class="text-center text-base font-semibold mt-3">
                @{profileData?.username}
              </h2>

              <h3 class="text-center text-sm font-normal text-gray-300 mt-1">
                @{profileData?.email}
              </h3>
            </div>
            {profileData?.email === userData?.email && (
              <p class="text-center text-gray-200 mt-1">{profileData?.email}</p>
            )}

            <div className="text-center mt-16 flex  flex-col sm:flex-row justify-between">
              <Link href={`/dashboard/${profileData?.farmland}`}>
                <p
                  className={`bg-purple-600 cursor-pointer py-3 px-3 rounded mb-5 md:mb-0 `}
                >
                  Go to farm
                </p>
              </Link>
              <p
                onClick={(e) => {
                  if (userData?.username !== profileData?.username)
                    return toast.warn(
                      "Please login into your account to proceed"
                    );

                  e.stopPropagation();
                  setEditProfile(true);
                }}
                className={`bg-purple-600 py-3 cursor-pointer px-3 rounded mb-5  md:mb-0  ${
                  userData?.username !== profileData?.username &&
                  "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Update profile
              </p>
              <p
                onClick={logOut}
                className={`bg-[red] cursor-pointer py-3 px-3 rounded mb-5  md:mb-0  ${
                  userData?.username !== profileData?.username &&
                  "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Log out
              </p>
            </div>
          </div>
        ) : (
          <div className="  text-center mx-0 h-screedn flex items-center  justify-center">
            <div className="flex items-center text-white justify-center flex-col">
              <p className="dashboard-mssg">{fetchError}</p>
            </div>
          </div>
        )}

        {!editProfile && (
          <div className="mt-10">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
