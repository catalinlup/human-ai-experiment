import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetRoomStatusQuery } from "../../store/task_backend/sessionApi";
import SessionController from "../SessionController/SessionController";
import { useTimer } from 'react-timer-hook';
import {Button} from 'antd'




const LobbyLoadingScreen = ({prolific_id, session_id, study_id}) => {

    const [showRedirect, setShowRedirect] = useState(false)

    const time = new Date()
    time.setSeconds(time.getSeconds() + 300)
    const {} = useTimer({expiryTimestamp: time, onExpire: () => {setShowRedirect(true)}})


    return <div style={{textAlign: 'center', marginTop: 40, fontSize: 24}}>
            Waiting for other crowdworkers to join...
            <LoadingSpinner />
            
            {showRedirect&&
                <Button href={`https://steady-computer-390316.web.app?PROLIFIC_PID=${prolific_id}&SESSION_ID=${session_id}&STUDY_ID=${study_id}`} type='link' style={{marginTop: 20, fontSize: 18}}>
                    Click to join individually
                </Button>
            }
        </div>
}


const RoomEndedScreen = ({prolific_id, session_id, study_id}) => {


    return (<div style={{textAlign: 'center', marginTop: 40, fontSize: 24}}>
                    <p>The room has ended.</p>
                    <Button href={`https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_bCOF6xAEvRDWP78?PROLIFIC_PID=${prolific_id}&SESSION_ID=${session_id}&STUDY_ID=${study_id}`} type='link' style={{marginTop: 20, fontSize: 18}}>
                        Click here to join the end survey.
                    </Button>
            </div>)
}

const RoomStateController = ({roomData, session_id, prolific_id, study_id}) => {

    const {data: roomStatus, isLoading: isRoomStatusLoading} = useGetRoomStatusQuery(roomData.room_id, {pollingInterval: 5000})

    

    if (isRoomStatusLoading) {
        return <LoadingSpinner />
    }

    // alert(roomStatus.event_type)

    if (roomStatus.event_type === 'room_created') {
        return <LobbyLoadingScreen 
            session_id={session_id}
            prolific_id={prolific_id}
            study_id={study_id}
        />
    }

    if (roomStatus.event_type === 'room_ended') {
        // return <div style={{textAlign: 'center', marginTop: 40, fontSize: 24}}>The room has ended.</div>
        return <RoomEndedScreen prolific_id={prolific_id} session_id={session_id} study_id={study_id}/>
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