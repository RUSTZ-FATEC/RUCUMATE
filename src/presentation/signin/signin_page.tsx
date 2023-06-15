import React, { useState } from 'react';

import Logo from "../../assets/images/logo.svg";

export const SigninComponent: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClick = () => {
        const url = "https://rucumate.herokuapp.com/user/login";

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "passwd": password
            })
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Authentication successful") {
                    window.localStorage.setItem("user_id", data.user.id)
                    window.location.href = 'umidade';
                }
            });
    }

    return (
        <>
            <div className='flex items-center justify-center mx-auto h-screen'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-14 w-auto"
                            src={Logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Acessar sua conta
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    E-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                        className="block outline-none bg-[#404041] text-white w-full rounded-md border-0 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Senha
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={handlePasswordChange}
                                        type='password'
                                        required
                                        className="block outline-none bg-[#404041] text-white w-full rounded-md border-0 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-[#00960A] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00960A]"
                                >
                                    Acessar
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-white">
                            Não possui uma conta?{' '}
                            <a href="/cadastro" className="font-semibold leading-6 text-[#00960A]">
                                Cadastro
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
