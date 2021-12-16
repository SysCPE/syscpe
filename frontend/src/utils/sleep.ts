const sleep = (sleepInMs = 800) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, sleepInMs);
  });
};

export default sleep;
