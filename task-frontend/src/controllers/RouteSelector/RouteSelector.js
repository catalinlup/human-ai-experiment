import { Button, Carousel, Radio, Space, Pagination } from 'antd';
import { useGetRouteCountQuery } from '../../store/task_backend/taskApi';
import DynamicMap from '../DynamicMap/DynamicMap';
import { useRef, useState } from 'react';

const RouteSelector = ({taskId}) => {

    const {data: routeCountData, isLoading: isRouteCountLoading} = useGetRouteCountQuery(taskId)
    const [currentRoute, setCurrentRoute] = useState(1)
    // const carouselRef = useRef(null)

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
            <Space direction={'vertical'} style={{textAlign: 'center'}}>
                <DynamicMap taskId={taskId} routeId={i}/>

                <h2>Route {i + 1}</h2>
            </Space>
        </>)
    }

    return (<>
        
        {/* <Carousel ref={carouselRef} dotPosition={'bottom'} style={{textAlign: 'center', height: '670px'}}>
            {mapOptions}
        </Carousel> */}
        {/* <DynamicMap taskId={33} routeId={0}/> */}
        {/* {mapOptions} */}
        
        <Space direction={'vertical'} style={{paddingLeft: '5%', paddingRight: '5%'}}>
            {mapOptions[currentRoute - 1]}

            <div style={{textAlign: 'center'}}>
                <Pagination simple current={currentRoute} onChange={(new_route) => setCurrentRoute(new_route)}  total={mapOptions.length * 10} />
            </div>
        </Space>

        {/* <div style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>
            <Space direction={'horizontal'}>
                <Button size='sm' type='primary' onClick={() => {carouselRef.current.prev()}}>{'<--'}</Button>
                <Button type='primary' onClick={() => {carouselRef.current.next()}}>{'-->'}</Button>
            </Space>
        </div> */}
    </>)
}

export default RouteSelector;