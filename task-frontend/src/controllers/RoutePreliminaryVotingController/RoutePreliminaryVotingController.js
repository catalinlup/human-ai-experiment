import useSelection from "antd/es/table/hooks/useSelection";
import RouteVotingArea from "../../components/RouteVotingArea/RouteVotingArea";

import { usePreliminaryVoteMutation } from "../../store/task_backend/voteApi";
import { useEffect, useState } from "react";
import { useTimer } from 'react-timer-hook';

const RoutePreliminaryVotingController = ({taskId, session_id, prolific_id, timer=360}) => {


    const [vote] = usePreliminaryVoteMutation()
    const [alreadyVoted, setAlreadyVoted] = useState(false)


    const submitVote = (voted_route_number, confidence=0) => {
        // return;
        vote({session_id: session_id, voted_route_number: voted_route_number, prolific_id: prolific_id, confidence})
        setAlreadyVoted(true)
    }

    // setup timer
    const time = new Date()
    time.setSeconds(time.getSeconds() + timer)
    const {totalSeconds, restart} = useTimer({expiryTimestamp: time, onExpire: () => {submitVote(-1, 0)}})


    useEffect(() => {
        setAlreadyVoted(false)

        // reset the timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + timer);
        restart(time)
    }, [taskId])


    // console.log(totalSeconds)
   

    return (
        <RouteVotingArea 
            onVoteSubmitted={(voted_route_number, confidence) => {
                submitVote(voted_route_number, confidence)
                // vote({session_id: session_id, voted_route_number: voted_route_number, prolific_id: prolific_id})
                // setAlreadyVoted(true)
            }}
            routeCount={5}
            alreadyVoted={alreadyVoted}
            buttonText={'Enter preliminary answer'}
            recommendedRoute={0}
            showRecommendation={false}
            timerSecondsLeft={totalSeconds}
          />
    )
}

export default RoutePreliminaryVotingController;