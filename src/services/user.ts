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

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
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

export const requestRoleChange = async (token: string, newData: any) => {
  const response = await fetch(`/api/role-change-request`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const editUserPublication = async (
  token: string,
  newData: Publication,
  pubId: string
) => {
  const response = await fetch(`/api/user/me/publication/${pubId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const deleteUserPublication = async (token: string, pubId: string) => {
  const response = await fetch(`/api/user/me/publication/${pubId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to fetch current user");
  return response.json();
};

export const updateUserForum = async (
  token: string,
  forumId: string,
  newData: any
) => {
  const response = await fetch(`/api/user/me/forums/${forumId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Error in updating forum");
  return response.json();
};

export const deleteUserForum = async (token: string, forumId: string) => {
  const response = await fetch(`/api/user/me/forums/${forumId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete post");
  return response.json();
};