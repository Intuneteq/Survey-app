import { axiosClient } from "../../../api/axios";

export const dashboardEndpoint = "/users/dashboard";

export const getDashboardData = async (): Promise<DashboardDataType> => {
   const res = await axiosClient.get("/users/dashboard");
   return res.data;
};
