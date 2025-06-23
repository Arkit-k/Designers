/**
 * Component mapping utilities for different UI libraries
 */

export interface ComponentMapping {
  source: string;
  target: string;
  props?: Record<string, any>;
}

export interface ComponentMapper {
  name: string;
  mappings: ComponentMapping[];
}

export const shadcnMapper: ComponentMapper = {
  name: 'shadcn',
  mappings: [
    { source: 'Button', target: 'Button' },
    { source: 'Card', target: 'Card' },
    { source: 'Input', target: 'Input' }
  ]
};

export const muiMapper: ComponentMapper = {
  name: 'mui',
  mappings: [
    { source: 'Button', target: 'Button' },
    { source: 'Card', target: 'Card' },
    { source: 'Input', target: 'TextField' }
  ]
};

export const chakraMapper: ComponentMapper = {
  name: 'chakra',
  mappings: [
    { source: 'Button', target: 'Button' },
    { source: 'Card', target: 'Box' },
    { source: 'Input', target: 'Input' }
  ]
};

export const mantineMapper: ComponentMapper = {
  name: 'mantine',
  mappings: [
    { source: 'Button', target: 'Button' },
    { source: 'Card', target: 'Card' },
    { source: 'Input', target: 'TextInput' }
  ]
};

export const componentMappers = {
  shadcn: shadcnMapper,
  mui: muiMapper,
  chakra: chakraMapper,
  mantine: mantineMapper
};

export function mapComponent(mapper: ComponentMapper, sourceComponent: string): ComponentMapping | undefined {
  return mapper.mappings.find(mapping => mapping.source === sourceComponent);
}
