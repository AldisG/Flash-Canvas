import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eraser, Shuffle } from "lucide-react";

type Props = {
    nextCard: Function;
    children?: React.ReactNode;
    shuffleDeck: Function;
}

const PracticeCanvas = ({nextCard, children, shuffleDeck}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const isDrawing = useRef(false); // ← ref, not state

    const getCoords = (e: React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
        if ('touches' in e) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        isDrawing.current = true;                          // instant, no async gap

        const { x, y } = getCoords(e, canvas.getBoundingClientRect());
        ctx.beginPath();
        ctx.moveTo(x, y);                                  // path starts exactly here
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current) return;                    // ref check, always current
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { x, y } = getCoords(e, canvas.getBoundingClientRect());
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const stopDrawing = () => {
        isDrawing.current = false;
        const canvas = canvasRef.current;
        if (canvas) canvas.getContext('2d')?.beginPath();
    };

    // BACKUP BELLOW
    // const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    //     setIsDrawing(true);
    //     draw(e);
    // };

    // const stopDrawing = () => {
    //     setIsDrawing(false);
    //     const canvas = canvasRef.current;
    //     if (canvas) {
    //         const ctx = canvas.getContext('2d');
    //         ctx?.beginPath();
    //     }
    // };

    // const draw = (e: React.MouseEvent | React.TouchEvent) => {
    //     if (!isDrawing) return;
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;

    //     const rect = canvas.getBoundingClientRect();
    //     let clientX, clientY;

    //     if ('touches' in e) {
    //         clientX = e.touches[0].clientX;
    //         clientY = e.touches[0].clientY;
    //     } else {
    //         clientX = e.clientX;
    //         clientY = e.clientY;
    //     }

    //     const x = clientX - rect.left;
    //     const y = clientY - rect.top;

    //     ctx.lineTo(x, y);
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    // };

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const handleNextCardEmit = () => {
        clearCanvas()
        nextCard()
    }

    const handleClickShuffle = () => {
        clearCanvas()
        shuffleDeck()
    }

    return (
        <div className="w-full space-y-2">
            <div className={`
                flex items-center 
                mb-6 gap-x-2 

                ${children && 'justify-evenly'}`
            }>
                <Button size='sm' className='w-1/5 bg-transparent' variant="outline" onClick={clearCanvas}>
                    <Eraser />
                </Button>

                <Button className='w-1/5' variant="outline" title='shuffle' size='sm' onClick={handleClickShuffle}>
                    <Shuffle />
                </Button>

                {children}

                <Button className='w-1/5' size='sm' onClick={handleNextCardEmit}>
                    Next
                </Button>
            </div>

            <div className="border-2 border-dashed border-muted rounded-xl overflow-hidden bg-white">
                {/* onPointerDown={draw} */}
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onPointerDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onPointerUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[calc(45vh-4rem)] md:h-[calc(70vh-8rem+2px)] touch-none cursor-crosshair"               
                />
            </div>
        </div>
    );
};

export default PracticeCanvas;