import axios from "axios";

const BASE_URL = "http://localhost:8080/website_dashboard/api";

export const getSkills = async () => {
  const response = await axios.get(`${BASE_URL}/skills`);
  return response.data;
};

export const getSkillById = async (id) => {
  const response = await axios.get(`${BASE_URL}/skills/${id}`);
  return response.data;
};