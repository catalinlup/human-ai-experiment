import { Button, Carousel, Radio, Space } from 'antd';
import { useGetRouteCountQuery } from '../../store/task_backend/taskApi';
import DynamicMap from '../DynamicMap/DynamicMap';
import { useRef } from 'react';

const RouteSelector = ({taskId}) => {

    const {data: routeCountData, isLoading: isRouteCountLoading} = useGetRouteCountQuery(taskId)
    const carouselRef = useRef(null)

    if (isRouteCountLoading) {
        return <div>Loading</div>
    }

    if (!routeCountData) {
        return <div>Error.</div>
    }

    const count = routeCountData['route_count']

    console.log(count)

    const mapOptions = []
    for (let i = 0; i < count; i++) {
        mapOptions.push(<>
            <Space direction={'vertical'}>
                <DynamicMap taskId={taskId} routeId={i}/>
                <h2>Route {i}</h2>
            </Space>
        </>)
    }

    return (<>
        
        <Carousel ref={carouselRef} dotPosition={'bottom'} style={{textAlign: 'center', height: '670px'}}>
            {mapOptions}
        </Carousel>
        <div style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>
            <Space direction={'horizontal'}>
                <Button size='sm' type='primary' onClick={() => {carouselRef.current.prev()}}>{'<--'}</Button>
                <Button type='primary' onClick={() => {carouselRef.current.next()}}>{'-->'}</Button>
            </Space>
        </div>
    </>)
}

export default RouteSelector;