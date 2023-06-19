import { useState } from "react"
import './RouteVotingArea.css'
import { Button, Card, Divider, Select, Typography, notification } from 'antd';

const { Paragraph, Text } = Typography;



const RouteVotingArea = ({onVoteSubmitted, routeCount, recommendedRoute, alreadyVoted=false, showRecommendation=true, buttonText='Vote', timerSecondsLeft=0}) => {

    const [selectedRoute, setSelectedRoute] = useState(0)
    const [api, contextHolder] = notification.useNotification();

    const routeOptions = []
    for (let i = 0; i < routeCount; i += 1) {
        routeOptions.push({value: i, label: `Route ${i + 1}`})
    }

    return (
        <>
         {contextHolder}
        <Card className="sticky-title" title="Route Voting" extra={`${timerSecondsLeft}s left`} style={{ height: '300px', overflow: 'auto' }}>
            <Select
                disabled={alreadyVoted}
                value={selectedRoute}
                style={{ width: 400 }}
                options={routeOptions}
                onChange={(r) => setSelectedRoute(r)}
            />
            <Divider />
            <Button 
                disabled={alreadyVoted} 
                size={'lg'} 
                style={{width: '100%'}} 
                type="primary"
                onClick={() => {
                    onVoteSubmitted(selectedRoute)
                    api.success({'description': `Vote registered! Voted for Route ${selectedRoute}.`})

                }}
            >
                    {buttonText}
            </Button>
            <Divider />
            <div style={{textAlign: 'center'}}>
                {showRecommendation&&
                    <Text keyboard level={2}>{`AI recommends route ${recommendedRoute + 1}.`}</Text>
                }

                {!showRecommendation&&
                    <Text keyboard level={2}>{`No AI recommendation yet.`}</Text>
                }

            </div>
        </Card>
        </>
    ) 
}

export default RouteVotingArea;