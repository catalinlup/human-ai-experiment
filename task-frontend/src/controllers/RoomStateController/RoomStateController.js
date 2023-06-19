import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetRoomStatusQuery } from "../../store/task_backend/sessionApi";
import SessionController from "../SessionController/SessionController";

const RoomStateController = ({roomData, session_id, prolific_id}) => {

    const {data: roomStatus, isLoading: isRoomStatusLoading} = useGetRoomStatusQuery(roomData.room_id, {pollingInterval: 5000})

    if (isRoomStatusLoading) {
        return <LoadingSpinner />
    }

    // alert(roomStatus.event_type)

    if (roomStatus.event_type === 'room_created') {
        return <div style={{textAlign: 'center', marginTop: 40, fontSize: 24}}>
            Waiting for other crowdworkers to join...
            <LoadingSpinner />
        </div>
    }

    if (roomStatus.event_type === 'room_ended') {
        return <div style={{textAlign: 'center', marginTop: 40, fontSize: 24}}>The room has ended.</div>
    }

    const getCurrentTaskId = (roomStatus) => {
        if (roomStatus.event_type === 'room_started') {
            return roomData.task_ids[0]
        }

        return roomData.task_ids[Number(roomStatus.event_arg) + 1]
    }

    return <SessionController session_id={session_id} prolific_id={prolific_id} roomData={roomData} taskId={getCurrentTaskId(roomStatus)}/>
}


export default RoomStateController;