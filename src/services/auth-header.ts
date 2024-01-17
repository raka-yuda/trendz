export default function authHeader(): Record<string, string> {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);

    if (user.accessToken) {
      return { "x-access-token": user.accessToken };
    }
  }
  return {};
}