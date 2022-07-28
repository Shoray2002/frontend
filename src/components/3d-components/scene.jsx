import React, {
  useRef,
  useMemo,
  createRef,
  Suspense,
  useState,
  useEffect,
} from "react";
import { Canvas, useFrame, transientUpdate } from "@react-three/fiber";
// import {
//   Html,
//   Mask,
//   useMask,
//   OrthographicCamera,
//   Clone,
//   Float as FloatImpl,
// } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import { Nodes, Node } from "./Nodes";

import { Container } from "react-bootstrap";
import create from "zustand";

const Store = create((set) => ({
  bears: [0, 0.5, 0],
  increasePopulation: () => set((state) => ({ bears: [1, 0.5, 0] })),
  removeAllBears: () => set({ bears: 0 }),
}));

const useStore = create((set) => ({
  pos: [0.5, 0.5, 0],
  carp: 0,
  increaseX: () => set((state) => ({ pos: state.pos[0] + 1 })),
  icarp: () =>
    set((state) => ({ carp: state.pos + 1 }, console.log(state.carp))),
}));

//   function BearCounter() {
//     const bears = Store(state => state.bears)
//     const increasePopulation = Store(state => state.increasePopulation, console.log(bears))
//     return (
//     <div>
//         <h1>{bears} around here ...</h1>
//         <Button onClick = {increasePopulation}/>
//     </div>
//     )

//   }
// import { BufferAttribute } from "three";

// // function BufferPoints({ count = 1000 }) {
// //   const points = useMemo(() => {
// //     const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);
// //     return new BufferAttribute(new Float32Array(p), 3);
// //   }, [count]);

// //   return (
// //     <points>
// //       <bufferGeometry>
// //         <bufferAttribute attach={"attributes-position"} {...points} />
// //       </bufferGeometry>
// //       <pointsMaterial
// //         size={0.1}
// //         threshold={0.1}
// //         color={0xff00ff}
// //         sizeAttenuation={true}
// //       />
// //     </points>
// //   );
// // }

// // function Box(props) {
// //     const mesh = useRef(null)
// //     const [hovered, setHover] = useState(false)
// //     const [active, setActive] = useState(false)
// //     useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
// //     return (
// //       <mesh
// //         {...props}
// //         ref={mesh}
// //         scale={active ? 1.5 : 1}
// //         onClick={(event) => setActive(!active)}
// //         onPointerOver={(event) => setHover(true)}
// //         onPointerOut={(event) => setHover(false)}>
// //         <boxGeometry args={[1, 1, 1]} />
// //         <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
// //       </mesh>
// //     )
// //   }

const Scene = (props) => {
  let data = [1, 0.5, 0];
  const [[a, b, c, d, e, z]] = useState(() => [...Array(6)].map(createRef));
  // const [pos, setpos] = useState(data)
  // useEffect(() => {
  //     setpos(data);
  //   }, [pos]);
  const list = props.list;
  console.log(list);
  const pos = useStore((state) => state.pos);
  const bears = Store((state) => state.bears);
  // const increasePopulation = Store(
  //   (state) => state.increasePopulation,
  //   console.log(bears)
  // );

  return (
    <Container
      style={{
        width: 1000,
        height: 600,
        backgroundColor: "powderblue",
      }}
    >
      {/* <Button onClick = { increasePopulation}/>
        <h1>{pos} </h1> */}

      <Canvas orthographic camera={{ zoom: 80 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Nodes dashed color="#ff1050" lineWidth={1}>
            {list.map((item, index) => (
              <Node
                key={index}
                ref={index % 2 ? a : z}
                name="a"
                position={item}
                connectedTo={[c]}
              />
            ))}
            {/* <Node ref={a} name="a" position={[-2, 2.5, 0]} connectedTo={[b]} /> */}
            <Node ref={b} name="b" position={[0, 1, 0]} connectedTo={[c]} />
            <Node ref={c} name="c" position={bears} connectedTo={[d]} />
            <Node ref={d} name="d" position={[2, 0.5, 0]} connectedTo={[e]} />
            <Node ref={e} name="e" position={[-0.5, -1, 0]} />
          </Nodes>
        </Suspense>
        {/* <OrbitControls/>  */}
      </Canvas>
    </Container>
  );
};

export default Scene;
