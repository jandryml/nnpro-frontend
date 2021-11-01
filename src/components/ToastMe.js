import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMe = (text) => {
    toast.error(text, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export default ToastMe;
