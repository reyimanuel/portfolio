"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Backend Architecture Node Specifications
// ---------------------------------------------------------------------------

interface NodeData {
  id: string;
  label: string;
  sub: string;
  position: [number, number, number];
  color: string;
  borderColor: string;
}

const NODES: NodeData[] = [
  {
    id: "client",
    label: "CLIENT",
    sub: "Next.js / Web",
    position: [-2.1, 1.4, 0],
    color: "#a1a1aa",
    borderColor: "#71717a",
  },
  {
    id: "api",
    label: "API GATEWAY",
    sub: "REST / Proxy",
    position: [0, 1.1, 0.2],
    color: "#22d3ee",
    borderColor: "#06b6d4",
  },
  {
    id: "service",
    label: "SERVICES",
    sub: "Golang / NestJS",
    position: [1.9, -0.1, 0.4],
    color: "#22d3ee",
    borderColor: "#0891b2",
  },
  {
    id: "database",
    label: "POSTGRESQL",
    sub: "Primary DB",
    position: [-0.4, -1.3, -0.1],
    color: "#f59e0b",
    borderColor: "#d97706",
  },
  {
    id: "cache",
    label: "REDIS",
    sub: "Cache & State",
    position: [-2.0, -0.5, 0.2],
    color: "#f59e0b",
    borderColor: "#d97706",
  },
];

interface Connection {
  from: [number, number, number];
  to: [number, number, number];
  speed: number;
  offset: number;
}

const CONNECTIONS: Connection[] = [
  { from: NODES[0].position, to: NODES[1].position, speed: 0.7, offset: 0 },
  { from: NODES[1].position, to: NODES[2].position, speed: 0.8, offset: 0.25 },
  { from: NODES[2].position, to: NODES[3].position, speed: 0.6, offset: 0.5 },
  { from: NODES[1].position, to: NODES[4].position, speed: 0.75, offset: 0.15 },
  { from: NODES[4].position, to: NODES[3].position, speed: 0.65, offset: 0.4 },
];

// ---------------------------------------------------------------------------
// Canvas Texture Generator for 3D Node Labels (100% Native WebGL Sprite)
// Avoids React 19 createRoot / unmount conflicts completely.
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

  // Background box with rounded corners
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

  // Primary label
  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = hovered ? "#22d3ee" : color;
  ctx.fillText(label, 192, 54);

  // Sub label
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

function ConnectionLine({ from, to, speed, offset }: Connection) {
  const pulseRef = useRef<THREE.Mesh>(null);

  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  );


  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = (clock.getElapsedTime() * speed * 0.4 + offset) % 1;
    pulseRef.current.position.x = from[0] + (to[0] - from[0]) * t;
    pulseRef.current.position.y = from[1] + (to[1] - from[1]) * t;
    pulseRef.current.position.z = from[2] + (to[2] - from[2]) * t;

    // Fade pulse at endpoints
    const opacity = Math.sin(t * Math.PI);
    const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
    if (mat) mat.opacity = opacity * 0.95;
  });

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x3f3f46,
      transparent: true,
      opacity: 0.65,
    });
    return new THREE.Line(geo, mat);
  }, [points]);

  return (
    <group>
      {/* Static connector line */}
      <primitive object={lineObj} />

      {/* Moving request packet / pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Single 3D Architecture Node
// ---------------------------------------------------------------------------

function ArchNode({ label, sub, position, color, borderColor }: NodeData) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Gentle floating breathing effect
    meshRef.current.position.y =
      initialY +
      Math.sin(clock.getElapsedTime() * 1.1 + position[0] * 1.5) * 0.05;
  });

  const labelTexture = useMemo(() => {
    return createLabelTexture(label, sub, color, hovered);
  }, [label, sub, color, hovered]);

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Solid core box */}
      <mesh>
        <boxGeometry args={[0.42, 0.42, 0.12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.35 : 0.18}
        />
      </mesh>

      {/* Glowing wireframe outline */}
      <mesh>
        <boxGeometry args={[0.43, 0.43, 0.13]} />
        <meshBasicMaterial
          color={borderColor}
          wireframe
          transparent
          opacity={hovered ? 0.9 : 0.55}
        />
      </mesh>

      {/* 3D Label Sprite: pure Three.js texture, no ReactDOM.createRoot / unmount conflicts */}
      {labelTexture && (
        <sprite position={[0, -0.42, 0]} scale={[1.15, 0.43, 1]}>
          <spriteMaterial map={labelTexture} transparent depthTest={false} />
        </sprite>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Mouse-following smooth camera rig
// ---------------------------------------------------------------------------

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const targetX = mouse.current.x * 0.45;
    const targetY = mouse.current.y * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

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
// Complete Scene
// ---------------------------------------------------------------------------

function Scene() {
  return (
    <>
      <CameraRig />
      <AmbientGrid />

      {/* Inter-node request paths with animated packets */}
      {CONNECTIONS.map((conn, i) => (
        <ConnectionLine key={`conn-${i}`} {...conn} />
      ))}

      {/* Architecture nodes */}
      {NODES.map((node) => (
        <ArchNode key={node.id} {...node} />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main SystemMap Export with internal Suspense
// ---------------------------------------------------------------------------

export function SystemMap() {
  return (
    <div className="relative h-full w-full min-h-[320px] rounded-xl border border-border-primary/80 bg-bg-secondary/40 backdrop-blur-sm overflow-hidden select-none">
      {/* Technical header badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-fg-muted uppercase tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span>system.topology</span>
      </div>

      <div className="absolute bottom-2 right-3 z-10 font-mono text-[9px] text-fg-muted/60">
        interactive · 3D map
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
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
    <div className="flex h-full w-full min-h-[320px] items-center justify-center rounded-xl border border-border-primary bg-bg-secondary/50 p-6">
      <div className="flex flex-col items-center gap-1 w-full max-w-xs">
        <div className="mb-2 font-mono text-[10px] text-fg-muted uppercase tracking-wider">
          SYSTEM TOPOLOGY
        </div>
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full rounded border border-border-primary bg-bg-primary px-4 py-2 font-mono text-xs">
              <span className={`font-semibold ${node.color}`}>{node.label}</span>
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
