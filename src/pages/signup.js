import { Footer } from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiFillMedicineBox,
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { MdMoney, MdRotateLeft } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function SignUp() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    farmland: "",
    role: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function signUp(e) {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.farmland ||
      !formData.role
    ) {
      return toast.error("Please, ensure that all field are filled");
    }
    setLoading(true);
    e.preventDefault();
    try {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        farmland: formData.farmland,
      };

      const res = await axios.post(
        `${BASE_URL}/auth/${formData.role}/register`,
        newUser
      );

      if (res) {
        setLoading(false);
        toast.success("Registration successful");
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);

      if (error.code === "ERR_NETWORK") {
        toast.error(error.message);
      }
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Druminant - Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>
      <div className="main">
        <Header />
        <div className="form mt-20  ">
          <>
            <div className="flex justify-center items-center  px-2  ">
              <div className=" bg-white h-full p-8 rounded shadow-md max-w-xl  w-full  ">
                <h2 className="text-2xl flex items-center space-x-3 font-bold mb-4">
                  <FaUser className="text-[#008000]  " />
                  <p className="text-green-900  ">Sign Up</p>
                </h2>
                <form onSubmit={signUp}>
                  <div className="  w-11/12 gap-8 mx-auto md:grid-cols-2 md:gap-16 md:w-4/5">
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="text-s  md:text-black"
                      >
                        Username
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <AiOutlineUser className="text-[#008000]  " />
                        </span>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="w-full py-2 px-2 outline-none h-10 t  md:text-black bg-transparent  "
                          placeholder="Enter your username"
                          required={true}
                          maxLength={12}
                          value={formData.username}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="text-base   md:text-black"
                      >
                        Email
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <AiOutlineMail className="text-[#008000] " />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full py-2 px-2 outline-none   md:text-black h-10 bg-transparent"
                          placeholder="Enter your email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="text-base   md:text-black"
                      >
                        Password
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <GoKey className="text-[#008000]" />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="w-full py-2 px-2 outline-none text-base h-12 md:text-black bg-transparent"
                          placeholder="Enter password"
                          required
                          value={formData.password}
                          onChange={(e) => handleChange(e)}
                        />
                        <span
                          className="pr-3 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="ethAddress"
                        className="text-base text- md:text-black"
                      >
                        Farmland name
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <PiPlantLight className="text-[#008000]  " />
                        </span>
                        <input
                          type="text"
                          id=""
                          name="farmland"
                          className="w-full py-2 px-2 outline-none  md:text-black h-10 bg-transparent"
                          placeholder="Enter farmland name"
                          required
                          value={formData.farmland}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="" className="text-base   md:text-black">
                        Role
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <RiAdminLine className="text-[#008000]  " />
                        </span>
                        <select
                          type="text"
                          id="role"
                          name="role"
                          className="w-full py-2 px-2 outline-none h-10  bg-transparent backdrop-blur   md:text-black "
                          placeholder="Enter your BNB wallet address"
                          required
                          value={formData.role}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value={""}>Select role</option>
                          <option className="" value={"admin"}>
                            Admin
                          </option>
                          <option value={"staff"}>Staff</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <label htmlFor="image" className="text-base">
                      Profile Image
                    </label>
                    <input
                      multiple={false}
                      type="file"
                      id="image"
                      className="w-full py-2 px-2 outline-none bg-transparent"
                      accept="image/*"
                      onChange={"handleImageChange"}
                    />
                  </div> */}

                  {loading ? (
                    <button
                      className="w-full flex items-center justify-center space-x-2  bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded  cursor-not-allowed"
                      disabled
                    >
                      <AiOutlineLoading3Quarters className="text-white text-lg animate-spin " />{" "}
                      <p> Registering...</p>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={signUp}
                      className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded"
                    >
                      Sign up
                    </button>
                  )}
                  {error && (
                    <p className="bg-red-900  p-2 text-white w-fit   rounded-sm mt-2">
                      {error}
                    </p>
                  )}
                </form>
                <div className="mt-5 text-base text-center flex justify-between w-full items-center max-w-xs mx-auto">
                  <p className="mx-auto text-black">
                    You have an account?{" "}
                    <Link href={"/login"} className="md:text-[#008000]">
                      Log in
                    </Link>
                  </p>
                  {/* <Link href="/login" className="text-[#008000]">
              Login
            </Link> */}
                </div>
              </div>
            </div>
          </>
          {/* 
        <div >
          <div className="login-btn">
            <p>
              <Link href={"/dashboard"}>Sign up</Link>
            </p>
          </div>
          <div className="signup2">
            <p>
              Have an account already?{" "}
              <Link href={"/login"} className="signup-link">
                Log In
              </Link>
            </p>
          </div>
        </div> */}
        </div>

        <div className="mt-20 md:mt-48">
          <Footer />
        </div>
      </div>
    </div>
  );
}
