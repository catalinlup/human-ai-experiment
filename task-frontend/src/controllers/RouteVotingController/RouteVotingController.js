import useSelection from "antd/es/table/hooks/useSelection";
import RouteVotingArea from "../../components/RouteVotingArea/RouteVotingArea";

import { useVoteMutation } from "../../store/task_backend/voteApi";
import { useEffect, useState } from "react";
import { useGetAiRouteQuery } from "../../store/task_backend/taskApi";
import { useTimer } from 'react-timer-hook';


const RouteVotingController = ({taskId, session_id, prolific_id, timer=300}) => {

    const {data, isLoading} = useGetAiRouteQuery(taskId)
    const [vote] = useVoteMutation()
    const [alreadyVoted, setAlreadyVoted] = useState(false)


    const submitVote = (voted_route_number) => {
        // return;
        vote({session_id: session_id, voted_route_number: voted_route_number, prolific_id: prolific_id})
        setAlreadyVoted(true)
    }


    // setup timer
    const time = new Date()
    time.setSeconds(time.getSeconds() + timer)
    const {totalSeconds, restart} = useTimer({expiryTimestamp: time, onExpire: () => {submitVote(-1)}})

    useEffect(() => {
        setAlreadyVoted(false)

        // reset the timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + timer);
        restart(time)
    }, [taskId])



    return (
        <RouteVotingArea 
            onVoteSubmitted={(voted_route_number) => {
                submitVote(voted_route_number)
                // vote({session_id: session_id, voted_route_number: voted_route_number, prolific_id: prolific_id})
                // setAlreadyVoted(true)
            }}
            routeCount={5}
            recommendedRoute={isLoading? null : data.route}
            alreadyVoted={alreadyVoted}
            timerSecondsLeft={totalSeconds}
          />
    )
}

export default RouteVotingController;