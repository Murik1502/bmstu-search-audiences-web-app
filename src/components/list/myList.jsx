import React from 'react';
import ListItem from "../listItem/listItem";
import "./myList.css"


const MyList = ({items}) => {
      if (!items.length) {
        return (
            <h1 className={"item-header"}>Нет Аудиторий!</h1>
        )
    }
    return (
        <div className={"items-wrapper"}>
                {items.map((item, index) =>
                    <ListItem key={index} number={item[1]} time={item[2]}></ListItem>)}
        </div>
    );
};

export default MyList;