import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

const ItemType = {
  PASSWORD_COMPONENT: 'passwordComponent',
};

const PasswordComponent = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PASSWORD_COMPONENT,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ backgroundColor: 'white', color: 'black' }}
      title={item.description}
    >
      {item.name}
    </div>
  );
};

const DroppedItem = ({ item, removeItem }) => {
  return (
    <div
      className="p-2 m-2 border rounded bg-light cursor-pointer"
      onClick={() => removeItem(item.id)}
      title="Click to remove"
    >
      {item.name}
    </div>
  );
};

const DropArea = ({ onDrop, droppedItems, removeItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.PASSWORD_COMPONENT,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 border-2 border-dashed rounded ${isOver ? 'bg-green-100' : 'bg-white'}`}
      style={{ minHeight: '100px' }}
    >
      {isOver ? 'Drop here!' : 'Drag components here to form a strong password'}
      <div className="mt-4">
        {droppedItems.map((item) => (
          <DroppedItem key={item.id} item={item} removeItem={removeItem} />
        ))}
      </div>
    </div>
  );
};

const DragAndDropQuiz = ({ nextLesson, prevLesson }) => {
  const initialItems = [
    { id: uuidv4(), name: "Uppercase Letter (A-Z)", description: "Adds complexity by including uppercase letters." },
    { id: uuidv4(), name: "Lowercase Letter (a-z)", description: "Adds complexity by including lowercase letters." },
    { id: uuidv4(), name: "Single Dictionary Word", description: "Common words are easy to guess and should not be used alone." },
    { id: uuidv4(), name: "Pet's Name", description: "Easily guessable information that should not be used in passwords." },
    { id: uuidv4(), name: "Number (0-9)", description: "Adds complexity by including numbers." },
    { id: uuidv4(), name: "Special Character (!@#)", description: "Adds complexity by including special characters." },
    { id: uuidv4(), name: "Your Birthdate", description: "Easily guessable information that should not be used in passwords." },
    { id: uuidv4(), name: "123456", description: "Common sequences are easy to guess and should not be used." }
  ];

  const [availableItems, setAvailableItems] = useState(initialItems);
  const [droppedItems, setDroppedItems] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDrop = (droppedItem) => {
    if (!droppedItems.some(item => item.id === droppedItem.id)) {
      setDroppedItems((prevItems) => [...prevItems, droppedItem]);
      setAvailableItems(prevItems => prevItems.filter((item) => item.id !== droppedItem.id));
    }
  };

  const handleCheck = () => {
    setShowResult(true);
    const requiredItems = ["Uppercase Letter (A-Z)", "Lowercase Letter (a-z)", "Number (0-9)", "Special Character (!@#)"];
    const incorrectItems = droppedItems.filter(item => !requiredItems.includes(item.name));
    setIsCorrect(incorrectItems.length === 0 && requiredItems.every(item => droppedItems.some(droppedItem => droppedItem.name === item)));
  };

  const removeItem = (id) => {
    const removedItem = droppedItems.find(item => item.id === id);
    setDroppedItems(prevItems => prevItems.filter(item => item.id !== id));
    setAvailableItems(prevItems => {
      if (!prevItems.some(item => item.id === removedItem.id)) {
        return [...prevItems, removedItem];
      }
      return prevItems;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
        <p className="mb-4">Drag and drop the elements below to form components of a strong password.</p>
        <div className="flex flex-wrap mb-4">
          {availableItems.map((item) => (
            <PasswordComponent key={item.id} item={item} />
          ))}
        </div>
        <DropArea onDrop={handleDrop} droppedItems={droppedItems} removeItem={removeItem} />
        {showResult && (
          <div className={`mt-4 p-4 ${isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
            {isCorrect ? 'Correct! You have included all necessary components of a strong password.' : 'Incorrect. Make sure to include all components: Uppercase letter, lowercase letter, number, and special character. Avoid using easily guessable information or common words.'}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button onClick={prevLesson} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Back
          </button>
          <button onClick={handleCheck} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4">
            Check
          </button>
          {isCorrect && (
            <button onClick={nextLesson} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-4">
              Next
            </button>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropQuiz;
