import React from "react";
import DashboardLayout from "../../Components/LayoutComponent/DashboardLayout";
import TableComponent from "../../Components/MadeComponent/TableComponent";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { LessonsData } from "../../Data/LessonsData";
import CustomButton from "../../Components/Customs/CustomButton";
import axios from "axios";

interface LessonsDashboardProps {}

const LessonsDashboard: React.FC<LessonsDashboardProps> = () => {
	const { id } = useParams();
	const states = useLocation();
	const datas: any = states.state;
	const navigate = useNavigate();

	const books: any = LessonsData.filter((items) => items.course_code === id);

	const handleUnenroll = () => {
		axios
			.post(`unenroll/${id}`)
			.then(() => {
				navigate("/dashboard");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<DashboardLayout>
			<div>
				<div className="flex justify-between px-5 items-center">
					<h1 className="text-4xl py-5 font-bold">{datas.name}</h1>
					<div className="w-60">
						<CustomButton
							children="Unenroll from course"
							onclick={handleUnenroll}
							backGroundColor={"red"}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="p-1.5 w-full inline-block align-middle">
							<div className="overflow-hidden border rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
											>
												Name
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
											>
												Description
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
											>
												Start lessons
											</th>
										</tr>
									</thead>
									{books &&
										books.map((item: any, n: number) => (
											<TableComponent
												name={item.name}
												title={item.title}
												pdf={item.pdf}
												key={n}
												buttonText={"Start lesson"}
											/>
										))}
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default LessonsDashboard;
