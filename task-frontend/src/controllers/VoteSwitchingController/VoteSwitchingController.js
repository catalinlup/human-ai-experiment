import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGetPreliminaryDoneQuery } from "../../store/task_backend/voteApi";
import RoutePreliminaryVotingController from "../RoutePreliminaryVotingController/RoutePreliminaryVotingController";
import RouteVotingController from "../RouteVotingController/RouteVotingController";


const VoteSwitchingController = ({taskId, room_id, session_id, prolific_id}) => {

    const {data, isLoading} = useGetPreliminaryDoneQuery({room_id, taskId}, {pollingInterval: 2000})

    if (isLoading) {
        return <LoadingSpinner />
    }

    const prelimary_done = data.preliminary_done

    // console.log('Preliminary', prelimary_done)

    if (!prelimary_done) {
        return <RoutePreliminaryVotingController taskId={taskId} session_id={session_id} prolific_id={prolific_id} />
    }

    return <RouteVotingController taskId={taskId} session_id={session_id} prolific_id={prolific_id}/>

}


export default VoteSwitchingController;