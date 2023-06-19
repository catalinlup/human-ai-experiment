import useSelection from "antd/es/table/hooks/useSelection";
import RouteVotingArea from "../../components/RouteVotingArea/RouteVotingArea";

import { usePreliminaryVoteMutation } from "../../store/task_backend/voteApi";
import { useEffect, useState } from "react";

const RoutePreliminaryVotingController = ({taskId, session_id, prolific_id}) => {

    const [vote] = usePreliminaryVoteMutation()
    const [alreadyVoted, setAlreadyVoted] = useState(false)

    useEffect(() => {
        setAlreadyVoted(false)
    }, [taskId])

    return (
        <RouteVotingArea 
            onVoteSubmitted={(voted_route_number) => {
                vote({session_id: session_id, voted_route_number: voted_route_number, prolific_id: prolific_id})
                setAlreadyVoted(true)
            }}
            routeCount={5}
            alreadyVoted={alreadyVoted}
            buttonText={'Cast preliminary vote'}
            recommendedRoute={0}
            showRecommendation={false}
          />
    )
}

export default RoutePreliminaryVotingController;