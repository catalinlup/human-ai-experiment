import RouteSelector from "../RouteSelector/RouteSelector"
import { Space } from "antd"
import RouteVotingController from "../RouteVotingController/RouteVotingController"
import TaskDescriptionController from "../TaskDescriptionController/TaskDescriptionController"
import ChatController from "../ChatController/ChatController"
import { useGetSessionQuery } from "../../store/task_backend/sessionApi"
import { useGetNicknameQuery } from "../../store/task_backend/userApi"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const SessionController = ({session_id, prolific_id, roomData, taskId}) => {

    const {data, isLoading} = useGetNicknameQuery(session_id)

    if (isLoading) {
        return <LoadingSpinner />
    }


    const senderName = data['user_name']

    const display = roomData.user_session_ids.map(id => <div>{id}</div>)

    return (
        <>
        <div style={{overflow: 'hidden', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column'}}>
          {/* {taskId}
          {display} */}



          <div style={{display: 'flex', flex: '70%', padding: '10px', backgroundColor: '#f1f1f1', overflow: 'scroll'}}>
            <RouteSelector taskId={taskId}/>
          </div>

          <div style={{display: 'flex', flex: '30%', padding: '10px', backgroundColor: '#ddd'}}>

             <Space direction={'horizontal'}>
              <div style={{width: '100%'}}>
                
                <RouteVotingController taskId={taskId} session_id={session_id} prolific_id={prolific_id}/>
              </div>
              <div style={{width: '100%'}}>
              <TaskDescriptionController taskId={taskId} />
      
              </div>
            </Space>

          </div>

         

         
          {/* <ChatController 
            roomId={roomData.room_id}
            senderName={senderName}
            prolific_id={prolific_id}
          /> */}
      </div>
      
    
      </>
    )
}

export default SessionController;