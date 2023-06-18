import TaskDescriptionArea from "../../components/TaskDescriptionArea/TaskDescriptionArea";
import { useGetDescriptionQuery } from "../../store/task_backend/taskApi";

const TaskDescriptionController = ({taskId}) => {
    const {data : descriptionData, isLoading: isDescriptionLoading} = useGetDescriptionQuery(taskId)

    if (isDescriptionLoading) {
        return <TaskDescriptionArea description={'Loading...'}/>
    }

    console.log(descriptionData)

    return <TaskDescriptionArea description={descriptionData.scenario} />
}

export default TaskDescriptionController;