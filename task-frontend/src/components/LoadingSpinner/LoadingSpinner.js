import {Spin, Button} from "antd"
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory
//   } from "react-router-dom";
/**
 * Spinning wheel to be displayed when the data is loading
 */
const LoadingSpinner = ({displayText='Loading'}) => (
    <>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px', flexDirection: 'column', gap: '30px'}}>
        <Spin size='large'>
        </Spin>
    </div>
    
    </>
)

export default LoadingSpinner;