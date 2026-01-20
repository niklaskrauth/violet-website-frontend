import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export type ModelLoaderProps = {
  prefix?: string
  modelName: string
  suffix?: string
}

export function useObjModelLoader({ prefix = '', modelName, suffix = '' }: ModelLoaderProps) {
  return useLoader(OBJLoader, '/assets/models/' + prefix + modelName + suffix + '.obj')
}

export function useGlbModelLoader({ prefix = '', modelName, suffix = '' }: ModelLoaderProps) {
  return useLoader(GLTFLoader, '/assets/models/' + prefix + modelName + suffix + '.glb').scene
}

export function useFbxModelLoader({ prefix = '', modelName, suffix = '' }: ModelLoaderProps) {
  return useLoader(FBXLoader, '/assets/models/' + prefix + modelName + suffix + '.fbx')
}
