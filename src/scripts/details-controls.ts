export function mountDetailsControls(root: ParentNode = document) {
  const detailsList = Array.from(root.querySelectorAll<HTMLDetailsElement>('details'));
  const btnExpand = root.querySelector<HTMLButtonElement>('#expand-all');
  const btnCollapse = root.querySelector<HTMLButtonElement>('#collapse-all');
  const previousState = new Map<HTMLDetailsElement, boolean>();

  if (!detailsList.length) {
    return;
  }

  const openAll = () => {
    detailsList.forEach((details) => {
      details.open = true;
    });
  };

  const closeAll = () => {
    detailsList.forEach((details) => {
      details.open = false;
    });
  };

  btnExpand?.addEventListener('click', (event) => {
    event.preventDefault();
    openAll();
  });

  btnCollapse?.addEventListener('click', (event) => {
    event.preventDefault();
    closeAll();
  });

  const beforePrint = () => {
    previousState.clear();
    detailsList.forEach((details) => {
      previousState.set(details, details.open);
      details.open = true;
    });
  };

  const afterPrint = () => {
    detailsList.forEach((details) => {
      const state = previousState.get(details);
      if (typeof state === 'boolean') {
        details.open = state;
      }
    });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
  }
}
