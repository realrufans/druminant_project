import { Footer } from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  AiFillMedicineBox,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { FaKey, FaUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { MdMoney, MdRotateLeft } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <Head>
        <title>Druminant - sign up</title>
        <meta name="description" content="Create an account on Druminant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <Header />
        <div className="form mt-28 ">
          {/* <div className="login-header">
          <FaUser className="login-user" style={{ marginTop: "-70px" }} />
          <p style={{ paddingBottom: "10px" }}>USER SIGNUP</p>
        </div> */}

          <>
            <div className="flex justify-center items-center    px-2  ">
              <div className="bg-white p-8 rounded shadow-md max-w-xl   w-full  ">
                <h2 className="text-2xl flex items-center space-x-3 font-bold mb-4">
                  <FaUser className="text-[#008000]" />
                  <p>Sign Up</p>
                </h2>
                <form onSubmit={"handleSubmit"}>
                  <div className="mb-4">
                    <label htmlFor="username" className="text-sm">
                      Username
                    </label>
                    <div className="flex items-center border rounded mt-1">
                      <span className="pl-3">
                        <AiOutlineUser className="text-[#008000]" />
                      </span>
                      <input
                        type="text"
                        id="username"
                        className="w-full py-2 px-2 outline-none  bg-transparent  "
                        placeholder="Enter your username"
                        required
                        maxLength={12}
                        value={"username"}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <div className="flex items-center border rounded mt-1">
                      <span className="pl-3">
                        <AiOutlineMail className="text-[#008000]" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        className="w-full py-2 px-2 outline-none bg-transparent"
                        placeholder="Enter your email"
                        required
                        value={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ethAddress" className="text-sm">
                      Password
                    </label>
                    <div className="flex items-center border rounded mt-1">
                      <span className="pl-3">
                        <GoKey className="text-[#008000]" />
                      </span>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full py-2 px-2 outline-none bg-transparent"
                        placeholder="Enter your BNB wallet address"
                        required
                        value={"wallet_address"}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ethAddress" className="text-sm">
                      Farmland name
                    </label>
                    <div className="flex items-center border rounded mt-1">
                      <span className="pl-3">
                        <PiPlantLight className="text-[#008000]" />
                      </span>
                      <input
                        type="text"
                        id=""
                        className="w-full py-2 px-2 outline-none bg-transparent"
                        placeholder="Enter your BNB wallet address"
                        required
                        value={"wallet_address"}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ethAddress" className="text-sm">
                      Role
                    </label>
                    <div className="flex items-center border rounded mt-1">
                      <span className="pl-3">
                        <RiAdminLine className="text-[#008000]" />
                      </span>
                      <select
                        type="text"
                        id="role"
                        name="role"
                        className="w-full py-2 px-2 outline-none bg-transparent"
                        placeholder="Enter your BNB wallet address"
                        required
                        value={"wallet_address"}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      >
                        <option value={"Admin"}>Admin</option>
                        <option value={"Staff"}>Staff</option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <label htmlFor="image" className="text-sm">
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
                      className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Registering...
                    </button>
                  ) : (
                    <button
                      type="submit"
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
                <div className="mt-10 text-sm text-center flex justify-between w-full items-center max-w-xs mx-auto">
                  <p className="text-">
                    {" "}
                    You have an account? <Link href={"/login"}>Log in</Link>
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
