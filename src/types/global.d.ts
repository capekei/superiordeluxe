// Extensiones globales para tipos de Window
interface Window {
  showCartNotification?: (productName: string) => void;
  initialData?: {
    allProducts: any[];
    initialFilters: Record<string, any>;
  };
}

// Extensiones para eventos DOM
interface MouseEvent {
  clientX: number;
  clientY: number;
}

// Extensiones para elementos DOM
interface Element {
  style: CSSStyleDeclaration;
  dataset: DOMStringMap;
}

// Extensiones para EventTarget
interface EventTarget {
  dataset?: DOMStringMap;
}
