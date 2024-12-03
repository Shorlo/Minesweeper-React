import React from 'react';
import { createRoot } from 'react-dom/client';

console.log("Iniciando aplicación...");

const root = createRoot(document.getElementById('app'));
root.render(<h1>¡Hola, mundo!</h1>);