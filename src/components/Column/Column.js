import'./Column.css';
const Column = (props)=>{
    return (
        <div className="board-column">
            {props.children}
        </div>
    )
}

export default Column;