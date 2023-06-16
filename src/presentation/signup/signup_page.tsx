import React, { useState } from 'react';

import Logo from "../../assets/images/logo.svg";

export const SignupComponent: React.FC = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleClick = () => {
        if (!email || !password) {
            setShowModal(true);
            return;
        }

        const url = "https://rucumate.herokuapp.com/user/login";

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "passwd": password
            })
        };

        fetch(url, config)
            .then(() => {
                window.location.href = "/login";
            })
            .catch(() => {
                setShowModal(true);
            });
    }

    const closeModal = () => {
        setShowModal(false);
    };

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
                            Cadastrar sua conta
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                    Usuário
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={username}
                                        onChange={handleUsernameChange}
                                        type="username"
                                        required
                                        className="block outline-none bg-[#202124] text-white w-full rounded-md border-0 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    E-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={handleEmailChange}
                                        type="email"
                                        required
                                        className="block outline-none bg-[#202124] text-white w-full rounded-md border-0 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                                        type="password"
                                        required
                                        className="block outline-none bg-[#202124] text-white w-full rounded-md border-0 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Confirmar senha
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        type="password"
                                        required
                                        className="block outline-none bg-[#202124] text-white w-full rounded-md border-0 py-1.5 px-4 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-[#00960A] px-3 py-1.5 text-sm text-white font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00960A]"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-white">
                            Já possui uma conta?{' '}
                            <a href="/login" className="font-semibold leading-6 text-[#00960A]">
                                Acessar
                            </a>
                        </p>
                    </div>
                </div>

                {showModal && (
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
                        <div className="fixed inset-0">
                            <div className="flex items-center h-screen justify-center text-center">
                                <div
                                    className="relative transform overflow-hidden rounded-lg bg-[#202124] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-[#202124] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#404041] sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">Dados
                                                    incorretos!</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-200">Verificar se você inseriu algo incorreto.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#202124] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" onClick={closeModal}
                                            className="inline-flex w-full justify-center rounded-md bg-[#00960A] px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Tentar
                                            novamente</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
