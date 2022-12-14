import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../Customs/CustomButton";

interface BookCardProps {
	book: string;
	name: string;
	title: string;
	course_id: string;
	buttonText?: string;
	type: string
}

const BookCard: React.FC<BookCardProps> = ({
	book,
	name,
	title,
	course_id,
	buttonText,
	type,
}) => {
	return (
		<div className="lg:col-span-3 cursor-pointer py-2 hover:shadow-md rounded-md shadow ">
			<img
				src={require(`../../Assets/bookimg/${book}`)}
				alt="book"
				className="w-full h-60"
			/>
			<div className="px-3">
				<div className="h-44">
					<h2 className="text-center py-5 font-semibold text-lg">
						{name}
					</h2>
					<p className="pb-2 ">{title}</p>
				</div>
				<Link to={`../${type}/${course_id}`} state={{ name: name }}>
					<CustomButton children={buttonText || " "} />
				</Link>
			</div>
		</div>
	);
};

export default BookCard;
