import RouteSelector from "../RouteSelector/RouteSelector"
import { Space } from "antd"
import RouteVotingController from "../RouteVotingController/RouteVotingController"
import TaskDescriptionController from "../TaskDescriptionController/TaskDescriptionController"
import ChatController from "../ChatController/ChatController"
import { useGetSessionQuery } from "../../store/task_backend/sessionApi"

const SessionController = ({userId}) => {

    const {data, isLoading} = useGetSessionQuery(userId)

    if (isLoading) {
        return <></>
    }

    console.log('Session data', data)

    const batchId = data['batch_id']
    const taskIds = data['task_ids']
    const senderName = data['user_name']

    return (
        <>
        <div style={{overflow: 'hidden', height: '100vh', width: '100vw'}}>
          <RouteSelector taskId={33}/>
          <Space direction={'horizontal'}>
            <div style={{width: '100%'}}>
              
              <RouteVotingController taskId={taskIds[0]}/>
            </div>
            <div style={{width: '100%'}}>
            <TaskDescriptionController taskId={taskIds[0]} />
    
            </div>
          </Space>
          <ChatController 
            roomId={`${batchId}-${taskIds[0]}`}
            senderName={senderName}
          />
      </div>
      
    
      </>
    )
}

export default SessionController;