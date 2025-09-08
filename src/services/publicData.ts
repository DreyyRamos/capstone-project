export const fetchUserLeaderboard = async () => {
  const response = await fetch("/api/public/users/leaderboard", {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   "Content-type": "application/json",
    // },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};
