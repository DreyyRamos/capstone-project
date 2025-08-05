export const fetchToReviewPubs = async (token: string) => {
  const response = await fetch("/api/publications/editor/toReview", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
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
