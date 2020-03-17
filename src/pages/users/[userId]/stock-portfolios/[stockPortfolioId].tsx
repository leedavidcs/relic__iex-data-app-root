import { withAuth } from "@/client/hocs";
import { NextPage } from "next";
import React from "react";

export const Page: NextPage = () => {
	return <div>Stock portfolio page works~!</div>;
};

export default withAuth()(Page);