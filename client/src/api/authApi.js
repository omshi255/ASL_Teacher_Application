const API_URL = import.meta.env.VITE_API_URL;

export const fetchMyProfile = async () => {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

  return data; // { user: {...} } OR direct user object (depends backend)
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await fetch(`${API_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};

export const deleteProfile = async () => {
  const res = await fetch(`${API_URL}/api/auth/delete-profile`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete profile");
  }

  return data;
};
