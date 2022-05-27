import React, { Component, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Navigate, useLocation } from "react-router-dom";

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

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '80%',
  margin:'auto'
  
//   marginLeft:500,
});

const getBackButtonStyle = () => ({
  padding: "10px",
  backgroundColor: "#0abab5",
  color: "white",
  border:0,
  cursor:"pointer",
  //float: 'right',
  margin:'20px 20px 20px 40px',
});

const Video = ({data,setData}) => {
    const location = useLocation();
    const {index} = location.state;
  
    // if(!index){
    //     Navigate({to:"/"});
    // }
  const [items, setItems] = useState(data[index]?.videos);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
 
    const i = reorder(items, result.source.index, result.destination.index);

    setItems(i);
    const arr = data.map((e,idx)=>{
        if(idx===index){
            return {
                ...data[index],
                videos: i
            }
        }
        return e
    })
    // setData([...data, {...data[index] , videos : i} ])
    setData(arr);
  };
  useEffect(() => {
    setItems(data[index]?.videos);
  }, [data])
  

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
            {items?.map((item, index) => (
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
                    // defaultValue={item.name}
                  >
                    {item.name}
                    
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <button style={getBackButtonStyle()} onClick={()=>{
      window.history.back();
    }}>
        Go Back
    </button>
    </>

  );
};

export default Video;