import Swal from "sweetalert2";

const logout = () => {
  Swal.fire({
    title: "Do you want to log out?",
    background: "#333",
    color: "#fff",
    showDenyButton: true,
    confirmButtonText: "Log Out Now!",
    denyButtonText: `Cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        Swal.fire({
          background: "#333",
          color: "#fff",
          title: "User Logged Out Successfully!",
          icon: "success",
        });
        window.location.reload();
      }
    }
  });
};

export default logout;
