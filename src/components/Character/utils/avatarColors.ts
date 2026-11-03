import * as THREE from "three";

// Which meshes of the bundled character each `avatar.colors` entry in portfolio.json paints.
// Body, face and clothes share one material in the model, so each part gets its own copy.
const avatarParts: Record<string, string[]> = {
  skin: ["Plane007", "Ear001", "Neck", "Hand"],
  hair: ["hair"],
  eyebrows: ["Eyebrow"],
  shirt: ["BODYSHIRT"],
  pants: ["Pant"],
  shoes: ["Shoe"],
  soles: ["Sole"],
};

const applyAvatarColors = (
  character: THREE.Object3D,
  colors: Record<string, string>
) => {
  Object.entries(avatarParts).forEach(([part, meshNames]) => {
    const color = colors[part];
    if (!color) return; // empty value keeps the model's original colour

    meshNames.forEach((name) => {
      const mesh = character.getObjectByName(name) as THREE.Mesh | undefined;
      if (!mesh?.isMesh || Array.isArray(mesh.material)) return;
      // One copy per mesh: sharing a material between the face (which has
      // morph targets) and other skinned parts renders those parts black
      const material = mesh.material.clone() as THREE.MeshStandardMaterial;
      material.color?.set(color);
      mesh.material = material;
    });
  });
};

export default applyAvatarColors;
