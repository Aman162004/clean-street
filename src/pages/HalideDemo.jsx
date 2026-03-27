import React from 'react';
import HalideLanding from '@/components/ui/halide-topo-hero';

/**
 * HalideDemo - Showcase page for the HalideLanding component
 * 
 * This is a full-screen immersive 3D hero component with:
 * - Mouse parallax effect
 * - 3D depth transformation
 * - Grainy film aesthetic
 * - Responsive typography
 * - Smooth entrance animation
 * 
 * Usage:
 * Import and render the component directly. It takes up full viewport.
 */

const HalideDemo: React.FC = () => {
  return (
    <div>
      <HalideLanding />
    </div>
  );
};

export default HalideDemo;
