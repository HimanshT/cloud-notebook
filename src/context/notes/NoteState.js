import noteContext from "./NoteContext";

const NoteState = (props) => {
    const state = {
        "name": "himanshu",
        "class": "5"
    }
    return (
        <noteContext.provider value={state}>
            {props.children}
        </noteContext.provider>
    )
}