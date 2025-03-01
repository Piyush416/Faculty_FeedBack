import React, { useState } from 'react';
import messageContext from './messageContext';

const MessageContextProvider = ({ children }) => {
    const [selectedFaculty, setselectedFaculty] = useState({});

    return (
        <messageContext.Provider value={{ selectedFaculty, setselectedFaculty }}>
            {children}
        </messageContext.Provider>
    );
};

export default MessageContextProvider;