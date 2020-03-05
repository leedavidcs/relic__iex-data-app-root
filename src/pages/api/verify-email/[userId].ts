import { verifyEmail } from "@/server/authentication";
import { NotFoundError } from "@/server/utils";
import HttpStatus from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { object, string, ValidationError } from "yup";

const inputSchema = object({ userId: string().required() });

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let validatedInputs: ReturnType<typeof inputSchema.validateSync>;

	try {
		validatedInputs = inputSchema.validateSync(req.query);
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return;
		}

		res.status(HttpStatus.BAD_REQUEST).json({ exception: err.errors.join(", ") });
		return;
	}

	try {
		await verifyEmail(validatedInputs);
	} catch (err) {
		if (!(err instanceof NotFoundError)) {
			res.status(HttpStatus.BAD_REQUEST);
			return;
		}

		res.status(HttpStatus.NOT_FOUND).json({ exception: "User could not be found" });
		return;
	}

	res.statusCode = HttpStatus.OK;
	res.setHeader("Location", "http://google.com");
	res.end();
};
