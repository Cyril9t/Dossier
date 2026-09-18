import React, { CSSProperties } from "react";

/**
 * RotatingCube
 *
 * A 3D rotating cube built with pure CSS 3D transforms.
 *
 * Props:
 * - size        : number  -> cube edge length in px (default 100)
 * - color       : string  -> face background color (default "#4f46e5")
 * - borderColor : string  -> border color of each face (default "#ffffff")
 * - borderWidth : number  -> border thickness in px (default 2)
 * - duration    : number  -> full rotation duration in seconds (default 8)
 * - faceOpacity : number  -> 0-1 opacity of each face (default 0.85)
 */
interface RotatingCubeProps {
    size?: number;
    color?: string;
    borderColor?: string;
    borderWidth?: number;
    duration?: number;
    faceOpacity?: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({
    size = 100,
    color = "#030706",
    borderColor = "#10b981",
    borderWidth = 2,
    duration = 8,
    faceOpacity = 0.85,
}) => {
    const half = size / 2;

    const faceBaseStyle: CSSProperties = {
        position: "absolute",
        width: size,
        height: size,
        border: `${borderWidth}px solid ${borderColor}`,
        backgroundColor: color,
        opacity: faceOpacity,
        boxSizing: "border-box",
        borderRadius: "8px"
    };

    const faceTransforms: string[] = [
        `rotateY(0deg) translateZ(${half}px)`, // front
        `rotateY(180deg) translateZ(${half}px)`, // back
        `rotateY(90deg) translateZ(${half}px)`, // right
        `rotateY(-90deg) translateZ(${half}px)`, // left
        `rotateX(90deg) translateZ(${half}px)`, // top
        `rotateX(-90deg) translateZ(${half}px)`, // bottom
    ];

    const containerStyle: CSSProperties = {
        width: size,
        height: size,
        perspective: size * 8,
    };

    const cubeStyle: CSSProperties = {
        width: size,
        height: size,
        position: "relative",
        transformStyle: "preserve-3d",
        animation: `cube-spin ${duration}s linear infinite`,
    };

    return (
        <div style={containerStyle}>
            <style>{`
        @keyframes cube-spin {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
            <div style={cubeStyle}>
                {faceTransforms.map((transform, i) => (
                    <div
                        key={i}
                        style={{
                            ...faceBaseStyle,
                            transform,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RotatingCube;
