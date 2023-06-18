import { useGetMapsQuery } from "../../store/task_backend/taskApi";
import './DynamicMap.css'


const DynamicMap = ({taskId, routeId}) => {

    // function htmlDecode(input){
    //     var e = document.createElement('div');
    //     e.innerHTML = input;
    //     return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    //   }

    // function createMarkup(text) { return {__html: htmlDecode(text)}; };
    

    // const {data: maps, isLoading: isMapsLoading} = useGetMapsQuery(taskId)

    // if (isMapsLoading) {
    //     return <div>Loading...</div>
    // }

    // console.log(maps)

    // const map_0 = maps['maps'][0]

    // console.log(map_0)
    // console.log(map_0)


    return (
        // <div>{map_0}</div>
        // <div dangerouslySetInnerHTML={{ __html: map_0 }} />
        <iframe className='dynamic-map' src={`/task/maps/${taskId}/${routeId}`} />
        // <div className='dynamic-map'></div>
    )
}

export default DynamicMap;