export const observeIntersector = (
  intersector: HTMLElement,
  callback: VoidFunction
) => {
  if (!intersector) return;
  const onIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(intersector);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.5,
  });
  observer.observe(intersector);
};
