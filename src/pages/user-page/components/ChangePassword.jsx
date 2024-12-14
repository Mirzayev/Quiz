import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldType, setOldType] = useState("password");
  const [newType, setNewType] = useState("password");
  const [confirmType, setConfirmType] = useState("password");

  const [oldIcon, setOldIcon] = useState(eyeOff);
  const [newIcon, setNewIcon] = useState(eyeOff);
  const [confirmIcon, setConfirmIcon] = useState(eyeOff);

  const handleToggle = (field) => {
    if (field === "old") {
      setOldType((prev) => (prev === "password" ? "text" : "password"));
      setOldIcon((prev) => (prev === eyeOff ? eye : eyeOff));
    } else if (field === "new") {
      setNewType((prev) => (prev === "password" ? "text" : "password"));
      setNewIcon((prev) => (prev === eyeOff ? eye : eyeOff));
    } else if (field === "confirm") {
      setConfirmType((prev) => (prev === "password" ? "text" : "password"));
      setConfirmIcon((prev) => (prev === eyeOff ? eye : eyeOff));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // localStorage-dan user ma'lumotlarini olish
    const userData = localStorage.getItem('user');
console.log(userData)
    // Agar userData mavjud bo'lsa, JSON parse qilish
    if (!userData) {
      alert("User data not found in localStorage!");
      return;
    }

    const user = JSON.parse(userData);
    const userId = user ? user.id : null;
console.log(userId)
    // Agar userId mavjud bo'lmasa, xatolik chiqarish
    if (!userId) {
      alert("User ID not found in localStorage!");
      return;
    }

    // Parollarni tekshirish
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const payload = {
      id: parseInt(userId),
      curPassword: oldPassword,
      password: newPassword,
      prePassword: confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:9090/api-auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Password changed successfully!");
        // Formani tozalash
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to change password"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password.");
    }
  };

  return (
    <div className="bg-[#f1f5f8]" style={{ height: "calc(100vh - 64px)" }}>
      <div className="p-8 flex flex-col gap-[20px]">
        <h1 className="text-[26px]">Change Password</h1>
        <form className="bg-white flex flex-col gap-3 rounded-[5px]" onSubmit={handleSubmit}>
          <div className="p-4 flex flex-col gap-[8px]">
            <label>Old password:</label>
            <div className="flex gap-[10px]">
              <input
                type={oldType}
                value={oldPassword}
                placeholder="Enter the old password"
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete="current-password"
                className="border-[1px] border-[#ccc] text-[16px] w-full rounded-[2px] px-[15px] py-[5px]"
              />
              <span className="opacity-30 p-1" onClick={() => handleToggle("old")}>
                <Icon icon={oldIcon} />
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-[8px]">
            <label>New password:</label>
            <div className="flex gap-[10px]">
              <input
                type={newType}
                value={newPassword}
                placeholder="Enter the new password"
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="border-[1px] border-[#ccc] text-[16px] w-full rounded-[2px] px-[15px] py-[5px]"
              />
              <span className="opacity-30 p-1" onClick={() => handleToggle("new")}>
                <Icon icon={newIcon} />
              </span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-[8px]">
            <label>Confirm password:</label>
            <div className="flex gap-[10px]">
              <input
                type={confirmType}
                value={confirmPassword}
                placeholder="Confirm the new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="border-[1px] border-[#ccc] text-[16px] w-full rounded-[2px] px-[15px] py-[5px]"
              />
              <span className="opacity-30 p-1" onClick={() => handleToggle("confirm")}>
                <Icon icon={confirmIcon} size={20} />
              </span>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-[250px]">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
