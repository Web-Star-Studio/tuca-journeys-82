
import { Root, createRoot as reactCreateRoot } from 'react-dom/client';

// Create a polyfill for document.createRoot
declare global {
  interface Document {
    createRoot: (node: Element) => Root;
  }
}

// Extend Document.prototype to add the createRoot method
Document.prototype.createRoot = function(node: Element): Root {
  return reactCreateRoot(node);
};

export {};
