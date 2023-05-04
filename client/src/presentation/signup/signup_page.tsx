import React, { useState } from "react";

import Box from "@mui/material/Box";

import Logo from "../../assets/images/logo.svg";

import BoxComponent from "../shared/components/form/box";
import TitleComponent from "../shared/components/form/title";
import LogoComponent from "../shared/components/form/logo";
import InputComponent from "../shared/components/form/input";
import ButtonComponent from "../shared/components/form/button";
import AccountComponent from "../shared/components/form/account";

import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export const SignUpComponent: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [confirmShowPassword, setConfirmShowPassword] = useState(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(false);

	const handleButtonClick = () => {
		if (
			username ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmPassword.trim() === ""
		) {
			setError(true);

			if (password !== confirmPassword) {
				window.alert("As senhas não conferem!");
			} else {
				setError(false);
                axios.post(
					"http://localhost:3000/user/register",
					{
						"user_name": username,
						"user_e_mail": email,
						"user_password": password,
					},
					{
						headers: {
							"Content-Type": "application/json",
							"Authorization":
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW4iOiJFU1AiLCJyZWMiOiJBUEkiLCJpYXQiOjE1MTYyMzkwMjJ9.-llEsTZQ686PhF5kQT6Z-wdBtSbqvHzNmX6bFYuauxI",
						},
					}
                ).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                }
                );
			}
		}
	};

	return (
		<>
			<BoxComponent>
				{<LogoComponent logo={Logo} />}
				{<TitleComponent title="Cadastro" />}
				{
					<InputComponent
						title="Usuário"
						value={username}
						onChange={(event: {
							target: { value: React.SetStateAction<string> };
						}) => setUsername(event.target.value)}
						error={error}
						helperText={error ? "Este campo é obrigatório" : ""}
					/>
				}
				{
					<InputComponent
						title="E-mail"
						value={email}
						onChange={(event: {
							target: { value: React.SetStateAction<string> };
						}) => setEmail(event.target.value)}
						error={error}
						helperText={error ? "Este campo é obrigatório" : ""}
					/>
				}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "auto auto auto",
						"@media screen and (max-width: 600px)": {
							display: "grid",
							gridTemplateColumns: "auto",
						},
					}}
				>
					{
						<InputComponent
							title="Senha"
							type={showPassword ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() =>
											setShowPassword(!showPassword)
										}
										sx={{ color: "#FFFFFF" }}
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								),
							}}
							value={password}
							onChange={(event: {
								target: { value: React.SetStateAction<string> };
							}) => setPassword(event.target.value)}
							error={error}
							helperText={error ? "Este campo é obrigatório" : ""}
						/>
					}
					<Box
						sx={{
							m: "15px",
							"@media screen and (max-width: 600px)": {
								m: "0",
							},
						}}
					/>
					{
						<InputComponent
							title="Confirmar senha"
							type={confirmShowPassword ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() =>
											setConfirmShowPassword(
												!confirmShowPassword
											)
										}
										sx={{ color: "#FFFFFF" }}
									>
										{confirmShowPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								),
							}}
							value={confirmPassword}
							onChange={(event: {
								target: { value: React.SetStateAction<string> };
							}) => setConfirmPassword(event.target.value)}
							error={error}
							helperText={error ? "Este campo é obrigatório" : ""}
						/>
					}
				</Box>
				{
					<ButtonComponent
						title="Cadastrar"
						onClick={handleButtonClick}
					/>
				}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "auto auto",
						placeItems: "center",
						mt: "10px",
						"@media screen and (max-width: 600px)": {
							display: "grid",
							gridTemplateColumns: "auto",
							placeItems: "center",
							mt: "10px",
						},
					}}
				>
					{
						<AccountComponent
							title="Já possui uma conta cadastrada?"
							title_link="Login"
							href="/login"
						/>
					}
				</Box>
			</BoxComponent>
		</>
	);
};
