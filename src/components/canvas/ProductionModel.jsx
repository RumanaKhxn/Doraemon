import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * ProductionModel Loader
 * Asynchronously loads a production GLTF model from a URL.
 * Automatically traverses meshes to configure casting/receiving shadows.
 * If the asset is missing or fails to load, it falls back to a procedural model.
 */
export default function ProductionModel({ url, fallback: Fallback, ...props }) {
  const [scene, setScene] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url) {
      setHasError(true);
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        // Configure shadows for all loaded meshes
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        setScene(gltf.scene);
      },
      undefined,
      (error) => {
        // Catch warning and flag error state to mount fallback
        console.warn(`Production model at [${url}] could not be loaded. Defaulting to procedural fallback.`);
        setHasError(true);
      }
    );
  }, [url]);

  if (scene) {
    return <primitive object={scene} {...props} />;
  }

  return <Fallback {...props} />;
}
