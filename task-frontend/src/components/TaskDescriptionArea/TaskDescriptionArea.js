import { Card } from 'antd';
import './TaskDescriptionArea.css'


const TaskDescriptionArea = ({description}) => {
    console.log(description)
    return (
        <Card className="sticky-title" title="Task Description" style={{ height: '300px', overflow: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
    </Card>
    )
}

export default TaskDescriptionArea;