interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  tags: string[];
  category: string;
}

export const fetchAllPubs = async (token: string) => {
  const response = await fetch("/api/publications", {
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

export const fetchArchivedPubs = async (token: string) => {
  const response = await fetch(`/api/publications/isArchived`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const likeForum = async (forumId: string, token: string) => {
  const res = await fetch(`/api/forums/${forumId}/like`, {
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

export const likeCommentForum = async (
  forumId: string,
  commentId: string,
  token: string
) => {
  const res = await fetch(`/api/forums/${forumId}/comments/${commentId}/like`, {
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
  const res = await fetch(`/api/publications/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment_content: comment }),
  });
  return await res.json();
};

export const replyToCommentPub = async (
  token: string,
  postId: string,
  reply: string,
  commentId: string
) => {
  const res = await fetch(`/api/publications/${postId}/comments/${commentId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reply_content: reply }),
  });
  return await res.json();
};

export const replyToReplyCommentPub = async (
  token: string,
  postId: string,
  reply: string,
  commentId: string
  // replyId: string
) => {
  const res = await fetch(
    `/api/publications/${postId}/comments/${commentId}/replies`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply_content: reply }),
    }
  );
  return await res.json();
};

export const createPost = async (token: string, newData: Publication) => {
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

export const updatePost = async (
  token: string,
  postId: string,
  newData: Publication
) => {
  const response = await fetch(
    `/api/publications/editor/toReview/${postId}/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
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


export const makeIsFeatured = async (token: string, postId: string) => {
  const response = await fetch(
    `/api/publications/isFeatured/makeFeature/${postId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to delete post");
  return response.json();
};