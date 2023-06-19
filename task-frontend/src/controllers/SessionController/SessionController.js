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
        <div style={{overflow: 'hidden', height: '100vh', width: '100vw'}}>
          {taskId}
          {display}
          <RouteSelector taskId={taskId}/>
          <Space direction={'horizontal'}>
            <div style={{width: '100%'}}>
              
              <RouteVotingController taskId={taskId} session_id={session_id} prolific_id={prolific_id}/>
            </div>
            <div style={{width: '100%'}}>
            <TaskDescriptionController taskId={taskId} />
    
            </div>
          </Space>
          <ChatController 
            roomId={roomData.room_id}
            senderName={senderName}
            prolific_id={prolific_id}
          />
      </div>
      
    
      </>
    )
}

export default SessionController;