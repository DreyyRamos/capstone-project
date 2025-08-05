export const markAsRead = async (id: string, token: string) => {
  try {
    await fetch(`/api/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  // await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
};


export const markAllAsRead = async (token: string) => {
  try {
    await fetch(`/api/notifications/mark-all-as-read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  // await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
};


