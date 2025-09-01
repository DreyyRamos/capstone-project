interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  bio: string;
  location: string;
  profileImage: string;
  interests: string[];
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

export const editCurrentUser = async (token: string, newData: User) => {
  const response = await fetch("/api/user/edit-user", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const fetchCurrentUserActivity = async (token: string) => {
  const response = await fetch("/api/user/activity", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const fetchVisitUser = async (id: string) => {
  const response = await fetch(`/api/user/visit/${id}`, {
    method: "GET",
    // body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const fetchVisitingUserActivity = async (id: string) => {
  const response = await fetch(`/api/user/visit/${id}/activity`, {
    method: "GET",
    // body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};
