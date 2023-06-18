import RouteVotingArea from "../../components/RouteVotingArea/RouteVotingArea";

const RouteVotingController = ({taskId}) => {

    return (
        <RouteVotingArea 
            onVoteSubmitted={() => {}}
            routeCount={9}
            recommendedRoute={4}
          />
    )
}

export default RouteVotingController;