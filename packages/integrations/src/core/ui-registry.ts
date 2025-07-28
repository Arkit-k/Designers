/**
 * UI Registry - Central registry for UI components and their configurations
 */

import type { ComponentDefinition, UILibraryAdapter } from '../types';

export class UIRegistry {
  private components = new Map<string, ComponentDefinition>();
  private adapters = new Map<string, UILibraryAdapter>();
  
  /**
   * Register a component definition
   */
  register(name: string, definition: ComponentDefinition): void {
    this.components.set(name, definition);
  }
  
  /**
   * Get a component definition
   */
  get(name: string): ComponentDefinition | undefined {
    return this.components.get(name);
  }
  
  /**
   * Get all registered components
   */
  getAll(): Map<string, ComponentDefinition> {
    return new Map(this.components);
  }
  
  /**
   * Check if a component is registered
   */
  has(name: string): boolean {
    return this.components.has(name);
  }
  
  /**
   * Remove a component
   */
  unregister(name: string): boolean {
    return this.components.delete(name);
  }
  
  /**
   * Register a UI library adapter
   */
  registerAdapter(library: string, adapter: UILibraryAdapter): void {
    this.adapters.set(library, adapter);
  }
  
  /**
   * Get a UI library adapter
   */
  getAdapter(library: string): UILibraryAdapter | undefined {
    return this.adapters.get(library);
  }
  
  /**
   * Get all available adapters
   */
  getAdapters(): string[] {
    return Array.from(this.adapters.keys());
  }
  
  /**
   * Bulk register components from a configuration object
   */
  registerFromConfig(config: Record<string, ComponentDefinition>): void {
    Object.entries(config).forEach(([name, definition]) => {
      this.register(name, definition);
    });
  }
  
  /**
   * Export all components as a configuration object
   */
  exportConfig(): Record<string, ComponentDefinition> {
    const config: Record<string, ComponentDefinition> = {};
    this.components.forEach((definition, name) => {
      config[name] = definition;
    });
    return config;
  }
  
  /**
   * Clear all registered components
   */
  clear(): void {
    this.components.clear();
  }
  
  /**
   * Get component names by category
   */
  getComponentsByCategory(category: string): string[] {
    const components: string[] = [];
    this.components.forEach((definition, name) => {
      if (definition.category === category) {
        components.push(name);
      }
    });
    return components;
  }
  
  /**
   * Search components by tags
   */
  searchByTags(tags: string[]): string[] {
    const components: string[] = [];
    this.components.forEach((definition, name) => {
      if (definition.tags && tags.some(tag => definition.tags!.includes(tag))) {
        components.push(name);
      }
    });
    return components;
  }
  
  /**
   * Validate component definition
   */
  private validateDefinition(definition: ComponentDefinition): boolean {
    return !!(
      definition.component &&
      definition.library &&
      definition.variants
    );
  }
  
  /**
   * Register with validation
   */
  registerSafe(name: string, definition: ComponentDefinition): boolean {
    if (this.validateDefinition(definition)) {
      this.register(name, definition);
      return true;
    }
    return false;
  }
}
