import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Settings } from "lucide-react";


interface NavigationProps {
    isBar?: boolean;
}

const Navigation = ({ isBar }: NavigationProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className="grid grid-cols-1 gap-4 my-4">
            {isBar ? (
                <div className="flex gap-x-4">
                    <Button
                        variant="default"
                        className={`px-2 py-1 text-sm shadow-md ${pathname == '/practice' && 'bg-cyan-800'}`}
                        onClick={() => { navigate('/practice') }}>
                        Practice
                    </Button>
                    <Button
                        variant="default"
                        className={`px-2 py-1 text-sm shadow-md ${pathname == '/manage' && 'bg-cyan-800'}`}
                        onClick={() => navigate('/manage')}>
                        Manage Cards
                    </Button>
                </div>
            ) : (
                <>
                    <Button
                        size="lg"
                        className="h-16 text-xl shadow-lg"
                        onClick={() => navigate('/practice')}
                    >
                        <BookOpen className="mr-3 w-6 h-6" />
                        Start Practicing
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="h-16 text-xl"
                        onClick={() => navigate('/manage')}
                    >
                        <Settings className="mr-3 w-6 h-6" />
                        Manage Cards
                    </Button>
                </>
            )}
        </div>
    )
}

export default Navigation;
