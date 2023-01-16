import React, { useContext, useState } from "react";
import { ActivityLoader } from "../components";
import { useMutation } from "@apollo/client";
import { AppContext } from "../context";
import { AUTHENTICATE } from "../graphql/mutations.graphql";

interface mutationStructure {
  authenticate: any;
}

interface mutationVars {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [performAuth, { data, loading, error }] = useMutation<
    mutationStructure,
    mutationVars
  >(AUTHENTICATE);

  const { updateAuthState } = useContext(AppContext);

  const onChange = (e: React.SyntheticEvent<any>) => {
    let element = e.currentTarget;
    setLoginData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let resp = await performAuth({
        variables: { email: loginData.email, password: loginData.password },
      });
      localStorage.setItem("uat", resp.data?.authenticate);
      updateAuthState({ user: resp.data?.authenticate });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className={
        "login-bg relative w-full h-full rounded flex justify-center items-center "
      }
    >
      <div
        className={
          "flex flex-col drop-shadow-lg rounded-lg h-[80%] min-w-[450px] max-w-[600px] p-[2rem] bg-[#1c1c1c] "
        }
      >
        <div className={"text-center mt-2"}>
          <span
            className={
              "tracking-wide text-white text-3xl font-poppins font-semibold leading-4"
            }
          >
            CarShare
            <span
              className={
                "font-poppins text-3xl font-bold leading-3 text-tealGreen"
              }
            >
              .
            </span>
          </span>
        </div>

        <div>
          <form onSubmit={onSubmit}>
            <div className={"flex flex-col mt-[3rem]"}>
              <p
                className={
                  "font-poppins mb-[1rem] font-normal mt-5 text-base text-white"
                }
              >
                Login to your account
              </p>
              <label className={"text-sm text-zinc-400 font-thin font-poppins"}>
                Email
              </label>
              <input
                required
                name={"email"}
                type={"email"}
                placeholder={"info@map.live"}
                onChange={onChange}
                className={
                  "p-3 tracking-wide text-basefont-thin font-nunito mt-1 rounded text-white bg-loginInput border-zinc-400"
                }
              />

              <label
                className={"text-sm text-zinc-400 font-thin font-poppins mt-5"}
              >
                Password
              </label>
              <input
                required
                name={"password"}
                type={"password"}
                onChange={onChange}
                className={
                  "p-3 tracking-wide text-base font-thin font-nunito mt-1 rounded text-white bg-loginInput"
                }
              />

              <div className={"flex justify-end mt-4"}>
                <button
                  type={"submit"}
                  className={
                    "rounded min-w-[20%] font-regular text-black justify-center bg-green-500 p-2 flex font-poppins"
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading && <ActivityLoader size={8} />}
    </div>
  );
};

export default LoginForm;
