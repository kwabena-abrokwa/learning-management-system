import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSelect from "../../Components/Customs/CustomSelect";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
	const [data, setdata] = useState({
		email: "",
		user_name: "",
		entry: "Beginner",
		password: "",
	});

	const [confirmPassword, setconfirmPassword] = useState("");

	const navigate = useNavigate();

	const [loader, setloader] = useState<Boolean>(false);
	const [message, setmessage] = useState<String>("");
	const [color, setcolor] = useState("red");

	const handleChange = (event: any): void => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setloader(true);
		if (data.user_name === "" || data.password === "" || data.email === "") {
			setloader(false);
			setmessage("All fields are required");
			return null;
		}

		if (data.password.toLowerCase() !== confirmPassword.toLowerCase()) {
			setloader(false);
			setmessage("Passwords do not match");
			return null;
		}
		await axios
			.post(`/signup`, data)
			.then(({ data }) => {
				if (data.auth === 1) {
					setloader(false);
					setmessage(data.message);
					setcolor("green");
					setTimeout(() => {
						navigate("/");
					}, 1000);
				} else {
					setmessage(data.message);
					setcolor("red");
					setloader(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setloader(false);
			});
	};

	return (
		<section className="signupBg h-screen">
			<div className="lg:w-2/6 mx-auto mt-1">
				<div className="logo w-20 mx-auto"></div>
				<div className="title text-center py-6">
					<h3 className="text-xl font-medium text-white">
						Create an account with us
					</h3>
				</div>
				<div className="w-full lg:shadow-md lg:border lg:rounded-lg p-2 my-5 bg-white">
					<form
						className="w-11/12 lg:w-5/6 mx-auto"
						onSubmit={handleLogin}
					>
						<div className="my-8">
							<label className="text-md font-semibold">Email</label>
							<CustomInput
								type={"email"}
								value={data.email}
								name={"email"}
								handleChange={handleChange}
								placeholder={"Example: kwabena@gmail.com"}
							/>
						</div>
						<div className="my-8">
							<label className="text-md font-semibold">Username</label>
							<CustomInput
								type={"text"}
								value={data.user_name}
								name={"user_name"}
								handleChange={handleChange}
								placeholder={"Example: kwabena__"}
							/>
						</div>
						<div className="my-8">
							<label className="text-md font-semibold">
								Entry Level
							</label>
							<CustomSelect
								value={data.entry}
								handleChange={handleChange}
								selectName={"entry"}
							>
								<option value="Beginner">
									Beginner - (6 - 7 years)
								</option>
								<option value="Intermediate">
									Intermediate - (8 - 10 years)
								</option>
								<option value="Advance">
									Advance - (11 - 12 years)
								</option>
							</CustomSelect>
						</div>
						<div className="my-8">
							<label className="text-md font-semibold">Password</label>
							<CustomInput
								type={"password"}
								value={data.password}
								name={"password"}
								handleChange={handleChange}
							/>
						</div>
						<div className="my-8">
							<label className="text-md font-semibold">
								Confirm Password
							</label>
							<CustomInput
								type={"password"}
								value={confirmPassword}
								name={"password"}
								handleChange={(e: any) =>
									setconfirmPassword(e.target.value)
								}
							/>
						</div>
						<div className="flex justify-between items-center my-8">
							<div className="flex  items-center">
								<input type={"checkbox"} id={"remember"} />
								<p className="ml-2 cursor-pointer" id={"remember"}>
									Remember me
								</p>
							</div>
							<div>
								<Link to={"/"}>
									<p className="text-gray-500">
										Have an account? Login
									</p>
								</Link>
							</div>
						</div>
						{message && (
							<div
								className="text-center p-4 my-8 rounded-lg w-full"
								style={{ backgroundColor: color }}
							>
								<p className="text-white">{message}</p>
							</div>
						)}
						<CustomButton>
							{loader ? "Please wait..." : "Create account"}
						</CustomButton>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Signup;
