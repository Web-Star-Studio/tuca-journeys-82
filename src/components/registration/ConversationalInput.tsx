
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConversationalInputProps {
  question: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  isAnswered: boolean;
  className?: string;
}

const ConversationalInput: React.FC<ConversationalInputProps> = ({
  question,
  children,
  isActive,
  isAnswered,
  className
}) => {
  return (
    <AnimatePresence>
      {(isActive || isAnswered) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "mb-8 transition-all duration-300",
            isActive ? "opacity-100" : "opacity-70",
            className
          )}
        >
          <div className="flex items-start mb-4">
            <div className="bg-teal-500 text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 4.2C9.5 3.5 10.1 2.9 10.8 3.1C15.4 4.3 18.5 9 17.3 14.6C16.2 20.2 10.4 23.7 5.7 21C4.4 20.3 3.4 19.4 2.6 18.3C2.3 17.9 2.7 17.3 3.2 17.4C6.5 18.1 9.5 15.5 9.5 11.5"/><path d="M13 7.5C13.3 7.8 13.7 8.2 14 8.5"/><path d="M16 11.5C16.2 12 16.3 12.4 16.5 13"/></svg>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="text-gray-800 dark:text-gray-200">{question}</p>
            </div>
          </div>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="ml-14"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
          
          {isAnswered && !isActive && (
            <div className="ml-auto mr-4 flex justify-end">
              <div className="bg-tuca-ocean-blue text-white p-3 rounded-lg rounded-br-none max-w-[80%]">
                {children}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationalInput;
