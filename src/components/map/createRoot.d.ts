
declare function createRoot(container: Element | DocumentFragment): {
  render(element: React.ReactElement): void;
  unmount(): void;
};
