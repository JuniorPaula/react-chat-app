import React from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SERVER_API_URL);
export const appContext = React.createContext();