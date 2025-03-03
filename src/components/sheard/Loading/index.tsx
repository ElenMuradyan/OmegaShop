import { Flex } from "antd";
import { useSelector } from "react-redux";
import { WrapperProps } from "../../../typescript/interfaces/wrapperProps";
import { RootState } from "../../../state-management/redux/store";
import './index.css';

const LoadingWrapper:React.FC<WrapperProps> = ({ children }) => {
    const { loading } = useSelector((store: RootState) => store.userData);

    return (<>
        {loading ? 
        <Flex align="center" justify="center" style={{width: '100%', height:'100vh'}}>
        <div className="spinner">
            <div className="spinner1"></div>
        </div>
        </Flex> 
        : children}
    </>   
    )
};

export default LoadingWrapper;