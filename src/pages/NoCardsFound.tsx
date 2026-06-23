import { RefreshCw } from 'lucide-react';
import React from 'react';

const NoCardsFound: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium">No cards to practice!</p>
            <p className="text-muted-foreground">Go to Manage to add some new cards.</p>
        </div>
    );
};

export default NoCardsFound;