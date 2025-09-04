import { toast } from "sonner";
import { Role, AdmissionStatus } from "@/generated/prisma";

interface Admission {
  admission_id: string;
  user_email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  id_picture: string;
  bio: string;
  contactNumber: string;
  location: string;
  interests: string[];
  role: Role;
  createdAt: Date;
  status: AdmissionStatus;
}

export const fetchAllUsers = async (token: string) => {
  const response = await fetch("/api/admin/fetch-users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const fetchAllUserAdmissions = async (token: string) => {
  const response = await fetch("/api/admin/user-admissions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const fetchRoleChangeRequests = async (token: string) => {
  const response = await fetch("/api/admin/fetch-role-requests", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const approveAdmission = async (
  token: string,
  admission_id: string,
  payload: {
    user_email: string;
    firstName: string;
    lastName: string;
    password: string;
    profileImage: string;
    id_picture: string;
    bio: string;
    contactNumber: string;
    location: string;
    interests: string[];
  }
) => {
  const res = await fetch(
    `/api/admin/user-admissions/${admission_id}/approve`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const rejectAdmission = async (token: string, admission_id: string) => {
  const res = await fetch(`/api/admin/user-admissions/${admission_id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteReportedContent = async (
  contentType: any,
  contentId: any,
  reportId: any,
  userId: string,
  token: string
) => {
  const response = await fetch("/api/reports/delete-content", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contentType, contentId, reportId, userId }),
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const restoreReportedContent = async (
  // contentType: any,
  // contentId: any,
  reportId: any,
  token: string
) => {
  const response = await fetch("/api/reports/resolve-report", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reportId }),
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const cleanupReports = async (
  // contentType: any,
  // contentId: any,
  // reportId: any,
  token: string
) => {
  const response = await fetch("/api/reports/cleanup-reports", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ reportId }),
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const fetchUsers = async (token: string) => {
  const response = await fetch(`/api/moderator/fetch-users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch post by id");
  return response.json();
};

export const triggerAction = async (
  token: string,
  userId: any,
  reportId: any
) => {
  console.log("triggerAction called with:", { userId, reportId });
  const response = await fetch(`/api/moderator/initiate-actions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, reportId }),
  });
  if (!response.ok) throw new Error("Failed to fetch post by id");
  return response.json();
};

export const fetchPubById = async (postId: string) => {
  const response = await fetch(`/api/publications/${postId}`, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  if (!response.ok) throw new Error("Failed to fetch post by id");
  return response.json();
};

export const fetchFeaturedPubs = async () => {
  const response = await fetch(`/api/publications/isFeatured`, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  if (!response.ok) throw new Error("Failed to fetch post by id");
  return response.json();
};

export const likePub = async (postId: string, token: string) => {
  const res = await fetch(`/api/publications/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to like post");
  }

  return await res.json();
};

export const addCommentPub = async (
  token: string,
  postId: string,
  comment: string
) => {
  const res = await fetch(`/api/publications/${postId}/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });
  return await res.json();
};

export const createPost = async (token: string, newData: any) => {
  const response = await fetch("/api/publications/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
};

export const approvePost = async (
  token: string,
  postId: string
  //   newData: any
) => {
  const response = await fetch(`/api/publications/editor/toReview/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "PUBLISHED" }),
  });
  if (!response.ok) throw new Error("Error in updating post");
  return response.json();
};

export const archivePost = async (
  token: string,
  postId: string
  //   newData: any
) => {
  const response = await fetch(
    `/api/publications/editor/toReview/${postId}/archive`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "ARCHIVED" }),
    }
  );
  if (!response.ok) throw new Error("Error in updating post");
  return response.json();
};

export const restoreArchivePost = async (
  token: string,
  postId: string
  //   newData: any
) => {
  const response = await fetch(
    `/api/publications/editor/toReview/${postId}/restore-archived`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "PENDING_REVIEW" }),
    }
  );
  if (!response.ok) throw new Error("Error in updating post");
  return response.json();
};

export const deletePost = async (token: string, postId: string) => {
  const response = await fetch(`/api/publications/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete post");
  return response.json();
};
