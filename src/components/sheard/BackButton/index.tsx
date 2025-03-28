import { BackwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../state-management/redux/store";

const BackButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClick = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        navigate(-1);
        if (scrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollPosition, 10)); 
            }, 50);  
        }}
    return (
        <Button
            onClick={() => handleOnClick()}
        >
            <BackwardOutlined />
        </Button>
    );
};

export default BackButton;
