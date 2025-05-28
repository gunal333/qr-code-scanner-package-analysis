/* interface IZoomProps {
    scanning: boolean;
    capabilities: { min: number; max: number; step: number };
    value: number;
    onZoom: (value: number) => void;
} */

export default function Zoom({ scanning, capabilities, onZoom, value }) {

    if (!scanning || !onZoom) {
        return null;
    }

    // const stepSize = (capabilities.max - capabilities.min) / 3;

    function handleZoomIn() {
        console.log("zoom in", capabilities)
        onZoom(Math.min(value + stepSize, capabilities.max));
    }

    function handleZoomOut() {
        onZoom(Math.max(value - stepSize, capabilities.min));
    }

    return (
        <div>
            <div style={{ bottom: 130, right: 8, position: 'absolute', zIndex: 2, cursor: 'pointer' }}>
                <button 
                    disabled={value <= capabilities.min} 
                    onClick={handleZoomOut}>Zoom out</button>
            </div>
            <div style={{ bottom: 180, right: 8, position: 'absolute', zIndex: 2, cursor: 'pointer' }}>
                <button 
                    disabled={value >= capabilities.max} 
                    onClick={handleZoomIn}>Zoom in</button>
            </div>
        </div>
    );
}