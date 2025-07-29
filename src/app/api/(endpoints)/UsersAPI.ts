interface User {
  name: string;
  profileImage: string;
  email: string;
}

export const fetchCurrentUser = async (token: string) => {
  const response = await fetch("/api/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const EditCurrentUser = async (token: string, newData: User) => {
  const response = await fetch("/api/edit-user", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};
