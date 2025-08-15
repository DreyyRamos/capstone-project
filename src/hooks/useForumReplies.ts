import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// export function useReplies(commentId: string, pubId: string) {
//   return useQuery({
//     queryKey: ["replies", commentId],
//     queryFn: () =>
//       fetch(`/api/publications/${pubId}/comments/${commentId}/replies`)
//         .then((r) => r.json())
//         .then(({ top, nested }) => {
//           // group once
//           const map = new Map<string, (typeof top)[0]>();
//           top.forEach((t: any) => map.set(t.replyId, t));
//           nested.forEach((n: any) =>
//             map.get(n.parentReplyId)?.children.push(n)
//           );
//           return top;
//         }),
//     enabled: !!commentId,
//   });
// }

export function useForumAddComment(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
    }) =>
      fetch(`/api/forums/${vars.forumId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_content: vars.content }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}

export function useForumAddTopReplyForum(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
      commentId: string;
    }) =>
      fetch(`/api/forums/${vars.forumId}/comments/${vars.commentId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply_content: vars.content }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}

export function useForumAddNestedReply(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
      replyId: string;
      commentId: string;
    }) =>
      fetch(
        `/api/forums/${vars.forumId}/comments/${vars.commentId}/replies/${vars.replyId}/children`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vars),
        }
      ).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}
