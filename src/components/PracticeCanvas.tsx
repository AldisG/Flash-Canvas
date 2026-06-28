import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eraser, Shuffle, PenLine, Hand } from "lucide-react";
import { getStroke } from 'perfect-freehand';

type Props = {
    nextCard: Function;
    children?: React.ReactNode;
    shuffleDeck: Function;
}

function getSvgPathFromStroke(stroke: number[][]): string {
    if (!stroke.length) return '';
    const d = stroke.reduce(
        (acc: (string | number)[], [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ['M', ...stroke[0], 'Q']
    );
    d.push('Z');
    return d.join(' ');
}

const PracticeCanvas = ({ nextCard, children, shuffleDeck }: Props) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [strokes, setStrokes] = useState<number[][][]>([]);
    const currentStroke = useRef<number[][]>([]);
    const [, forceUpdate] = useState(0);
    const [penOnly, setPenOnly] = useState(true); // pen-only ON by default

    const isAllowedInput = (e: PointerEvent | React.PointerEvent<SVGSVGElement>): boolean => {
        if (!penOnly) return true;
        // "pen" = stylus, "mouse" = mouse (fine to allow), "touch" = finger or palm
        return e.pointerType === 'pen' || e.pointerType === 'mouse';
    };

    const getPoint = (e: PointerEvent): [number, number, number] => {
        const rect = svgRef.current!.getBoundingClientRect();
        const rawPressure = e.pressure ?? 0.5;
        const MIN_PRESSURE = 0.02;
        const boostedPressure = rawPressure < MIN_PRESSURE
            ? 0
            : Math.min(1, 0.3 + rawPressure * 0.9);
        return [e.clientX - rect.left, e.clientY - rect.top, boostedPressure];
    };

    const startDrawing = (e: React.PointerEvent<SVGSVGElement>) => {
        if (!isAllowedInput(e)) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        currentStroke.current = [getPoint(e.nativeEvent)];
        forceUpdate(n => n + 1);
    };

    const draw = (e: React.PointerEvent<SVGSVGElement>) => {
        if (!currentStroke.current.length) return;
        if (!isAllowedInput(e)) return;
        const events = e.nativeEvent.getCoalescedEvents?.() ?? [e.nativeEvent];
        for (const ce of events) {
            currentStroke.current.push(getPoint(ce));
        }
        forceUpdate(n => n + 1);
    };

    const stopDrawing = (e: React.PointerEvent<SVGSVGElement>) => {
        const points = [...currentStroke.current]; // capture first
        if (!points.length) return;
        currentStroke.current = [];               // then clear
        setStrokes(prev => [...prev, points]);    // save captured points
        forceUpdate(n => n + 1);
    };

    const clearCanvas = () => {
        setStrokes([]);
        currentStroke.current = [];
        forceUpdate(n => n + 1);
    };

    const handleNextCardEmit = () => { clearCanvas(); nextCard(); };
    const handleClickShuffle = () => { clearCanvas(); shuffleDeck(); };

    const strokeOptions = { size: 6, thinning: 0.5, smoothing: 0.5, streamline: 0.5 };

    return (
        <div className="w-full space-y-2">
            <div className={`flex items-center mb-6 gap-x-2 ${children && 'justify-evenly'}`}>
                <Button size='sm' className='w-1/5 bg-transparent' variant="outline" onClick={clearCanvas}>
                    <Eraser />
                </Button>
                <Button className='w-1/5' variant="outline" title='shuffle' size='sm' onClick={handleClickShuffle}>
                    <Shuffle />
                </Button>
                <Button
                    className='w-1/5'
                    variant={penOnly ? "default" : "outline"}
                    title={penOnly ? 'Pen only (tap to allow finger)' : 'Finger allowed (tap for pen only)'}
                    size='sm'
                    onClick={() => setPenOnly(p => !p)}
                >
                    {penOnly ? <PenLine /> : <Hand />}
                </Button>
                {children}
                <Button className='w-1/5' size='sm' onClick={handleNextCardEmit}>
                    Next
                </Button>
            </div>

            <div className="border-2 border-dashed border-muted rounded-xl overflow-hidden bg-white">
                <svg
                    ref={svgRef}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerCancel={stopDrawing}
                    onPointerLeave={stopDrawing}
                    style={{ touchAction: 'none', userSelect: 'none', display: 'block' }}
                    className="w-full h-[calc(45vh-4rem)] md:h-[calc(70vh-8rem+2px)] cursor-crosshair"
                >
                    {strokes.map((stroke, i) => (
                        <path
                            key={i}
                            d={getSvgPathFromStroke(getStroke(stroke, strokeOptions))}
                            fill="#333"
                        />
                    ))}
                    {currentStroke.current.length > 0 && (
                        <path
                            d={getSvgPathFromStroke(getStroke(currentStroke.current, strokeOptions))}
                            fill="#333"
                        />
                    )}
                </svg>
            </div>
        </div>
    );
};

export default PracticeCanvas;