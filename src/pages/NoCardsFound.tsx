import { RefreshCw } from 'lucide-react';
import React from 'react';

const NoCardsFound: React.FC = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center text-center gap-y-4 bg-slate-400 p-12 h-auto rounded-md">
            <div className="w-20 h-20 flex items-center justify-center">
                <RefreshCw className="w-44 h-44" />
            </div>
            <p className="text-xl font-medium">No cards to practice!</p>
            <p>Go to Manage to add some new cards.</p>
        </div>
    );
};

export default NoCardsFound;