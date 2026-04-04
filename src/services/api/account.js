import API from "./api"; // Axios instance

// Login
export const loginUser = async ({ email, password }) => {
  try {
    const response = await API.post("/login", {
      username: email,  // or "email" if your API expects
      password,
      user_type: "Admin",
      login_type: "email",
    });

    return response.data; // {status, message, data}
  } catch (err) {
    console.error("Login error:", err);
    return { status: false, message: err.response?.data?.message || "Login failed" };
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (err) {
    console.error("Logout error:", err);
    return { status: false, message: err.response?.data?.message || "Logout failed" };
  }
};

// Register
export const registerUser = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await API.post("/register", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    return response.data; // {status, message, data}
  } catch (err) {
    console.error("Register error:", err);
    return { status: false, message: err.response?.data?.message || "Registration failed" };
  }
};