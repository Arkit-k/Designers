/**
 * Animation Registry - Manages animation presets and configurations
 */

import type { AnimationPreset, AnimationLibrary } from '../types';

export class AnimationRegistry {
  private presets = new Map<string, AnimationPreset>();
  private categories = new Map<string, string[]>();
  
  /**
   * Register an animation preset
   */
  register(name: string, preset: AnimationPreset, category?: string): void {
    this.presets.set(name, preset);
    
    if (category) {
      const existing = this.categories.get(category) || [];
      existing.push(name);
      this.categories.set(category, existing);
    }
  }
  
  /**
   * Get an animation preset
   */
  get(name: string): AnimationPreset | undefined {
    return this.presets.get(name);
  }
  
  /**
   * Get all presets
   */
  getAll(): Map<string, AnimationPreset> {
    return new Map(this.presets);
  }
  
  /**
   * Get presets by category
   */
  getByCategory(category: string): AnimationPreset[] {
    const names = this.categories.get(category) || [];
    return names.map(name => this.presets.get(name)!).filter(Boolean);
  }
  
  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }
  
  /**
   * Check if preset exists
   */
  has(name: string): boolean {
    return this.presets.has(name);
  }
  
  /**
   * Remove a preset
   */
  remove(name: string): boolean {
    const removed = this.presets.delete(name);
    
    // Remove from categories
    this.categories.forEach((names, category) => {
      const index = names.indexOf(name);
      if (index > -1) {
        names.splice(index, 1);
        if (names.length === 0) {
          this.categories.delete(category);
        }
      }
    });
    
    return removed;
  }
  
  /**
   * Clear all presets
   */
  clear(): void {
    this.presets.clear();
    this.categories.clear();
  }
  
  /**
   * Get presets compatible with a specific library
   */
  getByLibrary(library: AnimationLibrary): Map<string, AnimationPreset> {
    const compatible = new Map<string, AnimationPreset>();
    
    this.presets.forEach((preset, name) => {
      if (library === 'both') {
        compatible.set(name, preset);
      } else if (library === 'framer-motion' && preset.framer) {
        compatible.set(name, preset);
      } else if (library === 'gsap' && preset.gsap) {
        compatible.set(name, preset);
      }
    });
    
    return compatible;
  }
  
  /**
   * Bulk register presets
   */
  registerBulk(presets: Record<string, AnimationPreset>, category?: string): void {
    Object.entries(presets).forEach(([name, preset]) => {
      this.register(name, preset, category);
    });
  }
  
  /**
   * Export presets as JSON
   */
  export(): Record<string, AnimationPreset> {
    const exported: Record<string, AnimationPreset> = {};
    this.presets.forEach((preset, name) => {
      exported[name] = preset;
    });
    return exported;
  }
  
  /**
   * Import presets from JSON
   */
  import(presets: Record<string, AnimationPreset>): void {
    Object.entries(presets).forEach(([name, preset]) => {
      this.register(name, preset);
    });
  }
  
  /**
   * Search presets by name or description
   */
  search(query: string): Map<string, AnimationPreset> {
    const results = new Map<string, AnimationPreset>();
    const lowerQuery = query.toLowerCase();
    
    this.presets.forEach((preset, name) => {
      if (name.toLowerCase().includes(lowerQuery)) {
        results.set(name, preset);
      }
    });
    
    return results;
  }
  
  /**
   * Validate preset structure
   */
  validate(preset: AnimationPreset): boolean {
    // Must have at least one library implementation
    if (!preset.framer && !preset.gsap) {
      return false;
    }
    
    // Validate Framer Motion preset
    if (preset.framer) {
      const { framer } = preset;
      if (!framer.initial && !framer.animate && !framer.variants) {
        return false;
      }
    }
    
    // Validate GSAP preset
    if (preset.gsap) {
      const { gsap } = preset;
      if (!gsap.from && !gsap.to && !gsap.timeline) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Register with validation
   */
  registerSafe(name: string, preset: AnimationPreset, category?: string): boolean {
    if (this.validate(preset)) {
      this.register(name, preset, category);
      return true;
    }
    return false;
  }
  
  /**
   * Get preset statistics
   */
  getStats(): {
    total: number;
    framerOnly: number;
    gsapOnly: number;
    both: number;
    categories: number;
  } {
    let framerOnly = 0;
    let gsapOnly = 0;
    let both = 0;
    
    this.presets.forEach(preset => {
      const hasFramer = !!preset.framer;
      const hasGsap = !!preset.gsap;
      
      if (hasFramer && hasGsap) {
        both++;
      } else if (hasFramer) {
        framerOnly++;
      } else if (hasGsap) {
        gsapOnly++;
      }
    });
    
    return {
      total: this.presets.size,
      framerOnly,
      gsapOnly,
      both,
      categories: this.categories.size,
    };
  }
}
