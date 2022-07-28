import * as THREE from "three";
import {
  createContext,
  useMemo,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
  forwardRef,
  useEffect,
} from "react";
import { useFrame, useThree, applyProps } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import without from "lodash-es/without";
// import zustand from "zustand";

const removeZ = new THREE.Vector3(1, 1, 1);
const temp = new THREE.Vector3();
const context = createContext();

function Dot(props) {
  return (
    <mesh {...props}>
      <circleGeometry args={[0.05, 16]} />
      <meshBasicMaterial color="#ff1050" />
    </mesh>
  );
}

function Nodes({ children, ...props }) {
  console.log(children);
  const [nodes, set] = useState([]);
  const lines = useMemo(() => {
    const lines = [];
    for (let node of nodes) {
      if (node.connectedTo.length) {
        const connections = node.connectedTo.map((ref) => [
          node.position,
          ref.current.position,
        ]);
        connections.forEach(([start, end]) => {
          start = start.clone().add(temp.set(0.25, 0, 0));
          end = end.clone().add(temp.set(-0.25, 0, 0));
          const mid = start.clone().add(end.clone().sub(start)).add(new THREE.Vector3(0, (start.y - end.y), 0)) // prettier-ignore
          lines.push(
            new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(20)
          );
        });
      }
    }
    return lines;
  }, [nodes]);

  const group = useRef();
  useFrame((_, delta) =>
    group.current.children.forEach(
      (line) => (line.material.uniforms.dashOffset.value -= delta)
    )
  );

  return (
    <context.Provider value={set}>
      <group ref={group}>
        {lines.map((points, index) => (
          <Line key={index} points={points} color="white" dashScale={5} />
        ))}
      </group>
      {children}
      {lines.map((points, i) => (
        <group key={i} position-z={0}>
          <Dot position={points[0]} />
          <Dot position={points[points.length - 1]} />
        </group>
      ))}
    </context.Provider>
  );
}

const Node = forwardRef(
  ({ name, connectedTo = [], position = [0, 0, 0], ...props }, ref) => {
    const set = useContext(context);
    const { size, camera } = useThree();
    const [pos, setPos] = useState(() => new THREE.Vector3(...position));
    const state = useMemo(
      () => ({ position: pos, connectedTo }),
      [pos, connectedTo]
    );

    useLayoutEffect(() => {
      // Register this node on mount
      set((nodes) => [...nodes, state]);
      // Unregister on unmount
      return () => void set((nodes) => without(nodes, state));
    }, [state, pos]);

    // Drag n drop, hover
    const [hovered, setHovered] = useState(false);
    useEffect(
      () => void (document.body.style.cursor = hovered ? "grab" : "auto"),
      [hovered]
    );
    const bind = useDrag(({ down, xy: [x, y] }) => {
      document.body.style.cursor = down ? "grabbing" : "grab";
      console.log(down, x, y);  
      const unprojectedPoint = temp
        .set((x / 1000) - 1, -(y / 1000) + 1, 0)
        .unproject(camera)
        .multiply(removeZ)
        .clone();
      setPos(unprojectedPoint);
      console.log(hovered);
    });

    return (
      <mesh
        ref={ref}
        {...bind()}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={pos}
        {...props}
      >
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={hovered ? "#ff1050" : "black"} />
        <Text position={[0, 0, 0.3]} fontSize={0.25}>
          {name}
        </Text>
      </mesh>
    );
  }
);

export { Nodes, Node };
