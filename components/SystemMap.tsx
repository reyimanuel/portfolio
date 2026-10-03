"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Data & Types
// ---------------------------------------------------------------------------

interface NodeData {
  id: string;
  label: string;
  sub: string;
  description: string;
  position: [number, number, number];
  color: string;
  borderColor: string;
}

const NODES: NodeData[] = [
  {
    id: "client",
    label: "CLIENT",
    sub: "Next.js / Web",
    description: "Serves pre-rendered pages, handles routing, and provides an interactive UI using React 19.",
    position: [-1.6, 1.2, 0],
    color: "#a1a1aa",
    borderColor: "#71717a",
  },
  {
    id: "api",
    label: "API GATEWAY",
    sub: "REST / Proxy",
    description: "Central entry point. Handles rate limiting, authentication, and routes requests to microservices.",
    position: [0, 0.9, 0.2],
    color: "#22d3ee",
    borderColor: "#06b6d4",
  },
  {
    id: "service",
    label: "SERVICES",
    sub: "Golang / NestJS",
    description: "Core business logic. Processes data, interacts with external APIs, and formats responses.",
    position: [1.5, -0.1, 0.4],
    color: "#22d3ee",
    borderColor: "#0891b2",
  },
  {
    id: "database",
    label: "DATABASE",
    sub: "PostgreSQL / MySQL",
    description: "Relational storage for user data, transaction records, and persistent application state.",
    position: [-0.25, -1.0, -0.1],
    color: "#f59e0b",
    borderColor: "#d97706",
  },
  {
    id: "cache",
    label: "CACHE",
    sub: "Redis / In-Memory",
    description: "In-memory datastore used for session management and accelerating repeated query reads.",
    position: [-1.6, -0.5, 0.2],
    color: "#f59e0b",
    borderColor: "#d97706",
  },
];

interface Connection {
  source: string;
  target: string;
  speed: number;
  offset: number;
}

const CONNECTIONS: Connection[] = [
  { source: "client", target: "api", speed: 0.7, offset: 0 },
  { source: "api", target: "service", speed: 0.8, offset: 0.25 },
  { source: "service", target: "database", speed: 0.6, offset: 0.5 },
  { source: "api", target: "cache", speed: 0.75, offset: 0.15 },
  { source: "cache", target: "database", speed: 0.65, offset: 0.4 },
];

// ---------------------------------------------------------------------------
// Canvas Texture Generator for 3D Node Labels
// ---------------------------------------------------------------------------

function createLabelTexture(
  label: string,
  sub: string,
  color: string,
  hovered: boolean
) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 144;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const r = 18;
  const x = 12;
  const y = 12;
  const w = 360;
  const h = 120;

  ctx.fillStyle = hovered ? "rgba(24, 24, 27, 0.96)" : "rgba(19, 19, 22, 0.92)";
  ctx.strokeStyle = hovered ? "#22d3ee" : "rgba(63, 63, 70, 0.85)";
  ctx.lineWidth = hovered ? 4 : 3;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = hovered ? "#22d3ee" : color;
  ctx.fillText(label, 192, 54);

  ctx.font = "20px monospace";
  ctx.fillStyle = "#a1a1aa";
  ctx.fillText(sub, 192, 94);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// ---------------------------------------------------------------------------
// Animated Connection Line with Traveling Pulse
// ---------------------------------------------------------------------------

function ConnectionLine({
  source,
  target,
  speed,
  offset,
  isDimmed,
  isHighlighted,
}: Connection & { isDimmed: boolean; isHighlighted: boolean }) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pulseMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const sourceNode = useMemo(() => NODES.find((n) => n.id === source)!, [source]);
  const targetNode = useMemo(() => NODES.find((n) => n.id === target)!, [target]);

  const from = sourceNode.position;
  const to = targetNode.position;

  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  );

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x3f3f46,
      transparent: true,
      opacity: 0.65,
    });
    return new THREE.Line(geo, mat);
  }, [points]);

  useFrame(({ clock }) => {
    // 1. Move the pulse packet
    if (pulseRef.current) {
      const activeSpeed = isHighlighted ? speed * 1.4 : speed;
      const t = (clock.getElapsedTime() * activeSpeed * 0.4 + offset) % 1;
      pulseRef.current.position.x = from[0] + (to[0] - from[0]) * t;
      pulseRef.current.position.y = from[1] + (to[1] - from[1]) * t;
      pulseRef.current.position.z = from[2] + (to[2] - from[2]) * t;

      // 2. Fade pulse at endpoints and handle highlighting state
      const targetPulseMax = isDimmed ? 0 : isHighlighted ? 1 : 0.8;
      const opacity = Math.sin(t * Math.PI) * targetPulseMax;
      
      if (pulseMatRef.current) {
        pulseMatRef.current.opacity += (opacity - pulseMatRef.current.opacity) * 0.2;
      }
    }

    // 3. Smoothly animate line opacity based on interaction state
    if (lineMatRef.current) {
      const targetLineOpacity = isDimmed ? 0.1 : isHighlighted ? 0.8 : 0.45;
      lineMatRef.current.opacity += (targetLineOpacity - lineMatRef.current.opacity) * 0.1;
      
      // Update the actual material reference from the primitive
      const actualMat = lineObj.material as THREE.LineBasicMaterial;
      actualMat.opacity = lineMatRef.current.opacity;
    }
  });

  return (
    <group>
      <primitive object={lineObj} />
      {/* Hidden dummy material to hold state for the primitive */}
      <meshBasicMaterial ref={lineMatRef} visible={false} />

      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial ref={pulseMatRef} color="#22d3ee" transparent opacity={1} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Single 3D Architecture Node
// ---------------------------------------------------------------------------

interface ArchNodeProps {
  data: NodeData;
  isDimmed: boolean;
  isActive: boolean;
  onHover: (state: boolean) => void;
}

function ArchNode({ data, isDimmed, isActive, onHover }: ArchNodeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = data.position[1];
  const [hovered, setHovered] = useState(false);

  const actuallyHovered = hovered || isActive;

  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const spriteMatRef = useRef<THREE.SpriteMaterial>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Floating breathing effect
    meshRef.current.position.y =
      initialY +
      Math.sin(clock.getElapsedTime() * 1.1 + data.position[0] * 1.5) * 0.05;

    // Bounce and scale on hover/active
    const targetScale = actuallyHovered ? 1.08 : 1.0;
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.15;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.15;
    meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.15;

    // Smoothly transition opacities based on context state
    const targetCoreOp = isDimmed ? 0.05 : actuallyHovered ? 0.35 : 0.18;
    const targetWireOp = isDimmed ? 0.15 : actuallyHovered ? 0.9 : 0.55;
    const targetSpriteOp = isDimmed ? 0.25 : 1.0;

    if (coreMatRef.current) coreMatRef.current.opacity += (targetCoreOp - coreMatRef.current.opacity) * 0.1;
    if (wireMatRef.current) wireMatRef.current.opacity += (targetWireOp - wireMatRef.current.opacity) * 0.1;
    if (spriteMatRef.current) spriteMatRef.current.opacity += (targetSpriteOp - spriteMatRef.current.opacity) * 0.1;
  });

  const labelTexture = useMemo(() => {
    return createLabelTexture(data.label, data.sub, data.color, actuallyHovered);
  }, [data.label, data.sub, data.color, actuallyHovered]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <group
      ref={meshRef}
      position={data.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onHover(true); }} // Touch support
    >
      {/* Solid core box */}
      <mesh>
        <boxGeometry args={[0.42, 0.42, 0.12]} />
        <meshBasicMaterial
          ref={coreMatRef}
          color={data.color}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Glowing wireframe outline */}
      <mesh>
        <boxGeometry args={[0.43, 0.43, 0.13]} />
        <meshBasicMaterial
          ref={wireMatRef}
          color={data.borderColor}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* 3D Label Sprite */}
      {labelTexture && (
        <sprite position={[0, -0.42, 0]} scale={[1.15, 0.43, 1]}>
          <spriteMaterial ref={spriteMatRef} map={labelTexture} transparent depthTest={false} />
        </sprite>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Interactive Drag & Parallax Camera Rig
// ---------------------------------------------------------------------------

function CameraRig() {
  const { camera, scene, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      gl.domElement.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      isDragging.current = false;
      gl.domElement.style.cursor = "grab";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;
        targetRot.current.y += deltaX * 0.005;
        targetRot.current.x += deltaY * 0.005;
        // Limit vertical rotation to prevent flipping upside down
        targetRot.current.x = Math.max(-0.6, Math.min(0.6, targetRot.current.x));
        previousMouse.current = { x: e.clientX, y: e.clientY };
      } else {
        const rect = gl.domElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    canvas.style.cursor = "grab";

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [gl]);

  useFrame(() => {
    // If not dragging, slowly pull target rotation back toward the mouse parallax
    if (!isDragging.current) {
      const parallaxRotY = mouse.current.x * 0.15;
      const parallaxRotX = -mouse.current.y * 0.15;
      targetRot.current.y += (parallaxRotY - targetRot.current.y) * 0.05;
      targetRot.current.x += (parallaxRotX - targetRot.current.x) * 0.05;
    }

    // Apply smooth rotation to scene
    scene.rotation.y += (targetRot.current.y - scene.rotation.y) * 0.1;
    scene.rotation.x += (targetRot.current.x - scene.rotation.x) * 0.1;

    // Subtle camera translation for added depth
    camera.position.x += (mouse.current.x * 0.15 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.15 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Ambient Background Grid Particles
// ---------------------------------------------------------------------------

function AmbientGrid() {
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 35;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5 - 0.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={particleGeo}>
      <pointsMaterial size={0.03} color="#52525b" transparent opacity={0.4} />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Complete Scene Component
// ---------------------------------------------------------------------------

function Scene({
  activeNodeId,
  onNodeHover,
}: {
  activeNodeId: string | null;
  onNodeHover: (id: string | null) => void;
}) {
  return (
    <>
      <CameraRig />
      <AmbientGrid />

      {/* Inter-node request paths */}
      {CONNECTIONS.map((conn, i) => {
        const isHighlighted =
          activeNodeId !== null &&
          (conn.source === activeNodeId || conn.target === activeNodeId);
        const isDimmed = activeNodeId !== null && !isHighlighted;

        return (
          <ConnectionLine
            key={`conn-${i}`}
            {...conn}
            isDimmed={isDimmed}
            isHighlighted={isHighlighted}
          />
        );
      })}

      {/* Architecture nodes */}
      {NODES.map((node) => {
        const isActive = activeNodeId === node.id;
        const isNeighbor =
          activeNodeId !== null &&
          CONNECTIONS.some(
            (c) =>
              (c.source === activeNodeId && c.target === node.id) ||
              (c.target === activeNodeId && c.source === node.id)
          );
        const isDimmed = activeNodeId !== null && !isActive && !isNeighbor;

        return (
          <ArchNode
            key={node.id}
            data={node}
            isDimmed={isDimmed}
            isActive={isActive}
            onHover={(state) => onNodeHover(state ? node.id : null)}
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main SystemMap Export
// ---------------------------------------------------------------------------

export function SystemMap() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = useMemo(
    () => NODES.find((n) => n.id === activeNodeId) || null,
    [activeNodeId]
  );

  return (
    <div className="relative h-full w-full min-h-80 rounded-xl border border-border-primary/80 bg-bg-secondary/40 backdrop-blur-sm overflow-hidden select-none group">
      {/* Technical header badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-fg-muted uppercase tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span>system.topology</span>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-bg-primary/50 px-2.5 py-1 font-mono text-[10px] text-fg-muted/80 backdrop-blur-md transition-opacity duration-300 pointer-events-none group-hover:opacity-100 opacity-50">
        <span>DRAG TO ROTATE</span>
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>

      {/* Information Panel Overlay */}
      <div
        className={`absolute bottom-4 left-4 z-20 max-w-60 md:max-w-70 rounded-lg border border-border-primary bg-bg-primary/95 p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 ease-out pointer-events-none ${
          activeNode
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {activeNode && (
          <>
            <h4
              className="font-mono text-xs font-bold mb-1.5 uppercase tracking-wider"
              style={{ color: activeNode.color }}
            >
              {activeNode.label}
            </h4>
            <p className="text-xs text-fg-secondary leading-relaxed">
              {activeNode.description}
            </p>
          </>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene activeNodeId={activeNodeId} onNodeHover={setActiveNodeId} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static Fallback Diagram (for non-JS / SSR / minimal devices)
// ---------------------------------------------------------------------------

export function SystemMapFallback() {
  const nodes = [
    { label: "CLIENT", sub: "Next.js / Web", color: "text-fg-secondary" },
    { label: "API GATEWAY", sub: "REST / Proxy", color: "text-accent" },
    { label: "SERVICES", sub: "Golang / NestJS", color: "text-accent" },
    { label: "DATABASE", sub: "PostgreSQL", color: "text-accent-warm" },
    { label: "CACHE", sub: "Redis", color: "text-accent-warm" },
  ];

  return (
    <div className="flex h-full w-full min-h-80 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary/50 p-6">
      <div className="flex flex-col items-center gap-1 w-full max-w-xs">
        <div className="mb-2 font-mono text-[10px] text-fg-muted uppercase tracking-wider">
          SYSTEM TOPOLOGY
        </div>
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full rounded border border-border-primary bg-bg-primary px-4 py-2 font-mono text-xs">
              <span className={`font-semibold ${node.color}`}>
                {node.label}
              </span>
              <span className="text-[10px] text-fg-muted">{node.sub}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="h-3 w-px bg-accent/40 my-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
