const ProfileAvatar = ({ firstName, lastName }) => {
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <div className="w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center font-semibold">
      {initials.toUpperCase()}
    </div>
  );
};

export default ProfileAvatar;
