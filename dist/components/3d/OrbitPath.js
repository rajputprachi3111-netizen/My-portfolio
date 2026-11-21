import { jsx as _jsx, jsxs as _jsxs } from "https://esm.sh/react@18.3.1/jsx-runtime";
import * as THREE from 'https://esm.sh/three@0.168.0';
export const OrbitPath = ({ radius, color = '#00F0FF', isHighlighted = false }) => {
    return (_jsxs("group", { rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { children: [_jsx("ringGeometry", { args: [radius - 0.03, radius + 0.03, 96] }), _jsx("meshBasicMaterial", { color: color, transparent: true, opacity: isHighlighted ? 0.85 : 0.22, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })] }), isHighlighted && (_jsxs("mesh", { children: [_jsx("ringGeometry", { args: [radius - 0.12, radius + 0.12, 96] }), _jsx("meshBasicMaterial", { color: color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })] }))] }));
};
