interface Forum {
  topicTitle: string;
  description: string;
  tags: string[];
  category: string;
}

export const fetchAllForums = async (token: string) => {
  const response = await fetch("/api/forums", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const fetchForumById = async (forumId: string) => {
  const response = await fetch(`/api/forums/${forumId}`, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  if (!response.ok) throw new Error("Failed to fetch post by id");
  return response.json();
};

export const fetchForumByCategory = async (slug: string) => {
  const response = await fetch(`/api/forums/category/${slug}`, {
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

export const editCommentForum = async (
  token: string,
  forumId: string,
  commentId: string,
  comment: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/edit-comment`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editCommentContent: comment }),
    }
  );
  return await res.json();
};

export const deleteCommentForum = async (
  token: string,
  forumId: string,
  commentId: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/edit-comment`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ editCommentContent: comment }),
    }
  );
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

export const editReplyForum = async (
  token: string,
  forumId: string,
  commentId: string,
  replyId: string,
  comment: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/replies/${replyId}/edit-comment`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editCommentContent: comment }),
    }
  );
  return await res.json();
};

export const deleteReplyForum = async (
  token: string,
  forumId: string,
  commentId: string,
  replyId: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/replies/${replyId}/edit-comment`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ editCommentContent: comment }),
    }
  );
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

export const editReplyToReplyForum = async (
  token: string,
  forumId: string,
  commentId: string,
  replyId: string,
  childId: string,
  comment: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/replies/${replyId}/children/${childId}/edit-comment`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editCommentContent: comment }),
    }
  );
  return await res.json();
};

export const deleteReplyToReplyForum = async (
  token: string,
  forumId: string,
  commentId: string,
  replyId: string,
  childId: string
) => {
  const res = await fetch(
    `/api/forums/${forumId}/comments/${commentId}/replies/${replyId}/children/${childId}/edit-comment`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ editCommentContent: comment }),
    }
  );
  return await res.json();
};

export const createForum = async (token: string, newData: Forum) => {
  const response = await fetch("/api/forums/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) throw new Error("Failed to create post");
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
