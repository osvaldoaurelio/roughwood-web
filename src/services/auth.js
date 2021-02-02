import api from "../services/api";

export const signInService = async ({ username, password }) => {
  const payload = { session: { username, password } };
  const { data: { token, user } } = await api.post('sessions/admin', payload);
  await new Promise(resolve => setTimeout(resolve, 300));
  return { token, user };
};

export const signUpService = async ({ name, username, password }) => {
  const payload = { user: { name, username, password } };
  const { data: { user } } = await api.post('user_admins', payload);

  return { user };
}
