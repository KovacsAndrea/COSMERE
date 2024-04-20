import { useLocation } from "react-router-dom";

export const EditableChapterCard: React.FC<{}> = ({}) => {
    const location = useLocation();

    const data = location.state;
    return (<>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card</p>
        <p>editable chapter card {data}</p>
    </>)
}