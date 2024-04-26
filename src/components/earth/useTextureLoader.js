// useTextureLoader.js
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const useTextureLoader = (texturePath) => {
  const texture = useLoader(TextureLoader, texturePath);
  return texture;
};

export default useTextureLoader;