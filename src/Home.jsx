import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Com from './Com'

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
   display : 'flex',
  justifyContent: 'space-between',
  // change background colour if dragging
  background: isDragging ? "#40e0d0" : "#f0f2f5",

  // styles we need to Comply on draggables
  ...draggableStyle,
});

const getButtonStyle = () => ({
  padding: "10px",
  backgroundColor: "#1890ff",
  color: "white",
  border:0,
  cursor:"pointer"
});
const getSubmitButtonStyle = () => ({
  padding: "10px",
  backgroundColor: "#0abab5",
  color: "white",
  border:0,
  cursor:"pointer",
  float: 'right',
  margin:'20px 40px 20px 20px',
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '80%',
  margin:'auto'
 // display : 'flex',
  //justifyContent: 'space-between'
});

const Home = ({ data,setData }) => {
  const [items, setItems] = useState(data);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const i = reorder(items, result.source.index, result.destination.index);

    setItems(i);
    setData(i);
  };

  useEffect(() => {
    // console.log(data);
    setItems(data);
  }, [data]);

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.section}
                    <Link to="/videos" state={{data: item.videos,index: index}} >
                      <button style={getButtonStyle()}>Reorder Videos</button>
                    </Link>
                    {/* <Com data={item.videos} /> */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <button onClick={()=>{console.log("submit clicked");}} style={getSubmitButtonStyle()}>Submit</button>
    </>

  );
};

export default Home;
