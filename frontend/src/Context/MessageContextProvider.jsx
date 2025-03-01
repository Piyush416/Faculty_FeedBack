import React, { useState } from 'react';
import   MessageContext   from './messageContext';

const MessageContextProvider = ({ children }) => {
    const [selectedFaculty, setselectedFaculty] = useState({});

    return (
        <MessageContext.Provider value={{ selectedFaculty, setselectedFaculty }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContextProvider;