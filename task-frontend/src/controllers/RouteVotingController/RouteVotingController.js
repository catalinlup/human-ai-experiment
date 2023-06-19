import useSelection from "antd/es/table/hooks/useSelection";
import RouteVotingArea from "../../components/RouteVotingArea/RouteVotingArea";

import { useVoteMutation } from "../../store/task_backend/voteApi";
import { useEffect, useState } from "react";
import { useGetAiRouteQuery } from "../../store/task_backend/taskApi";

const RouteVotingController = ({taskId, session_id, prolific_id}) => {

    const {data, isLoading} = useGetAiRouteQuery(taskId)
    const [vote] = useVoteMutation()
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
            routeCount={9}
            recommendedRoute={isLoading? null : data.route}
            alreadyVoted={alreadyVoted}
          />
    )
}

export default RouteVotingController;