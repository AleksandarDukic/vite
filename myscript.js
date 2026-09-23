async function* clickStream(element) {
  let active = true;

  try {
    while (active) {
      const event = await new Promise(resolve =>
        element.addEventListener('click', resolve, { once: true })
      );
      yield event;
    }
  } finally {
    active = false;
    console.log('Stream stopped');
  }
}

async function* filter(stream, predicate) {
  for await (const value of stream) {
    if (predicate(value)) {
      yield value;
    }
  }
}

(async () => {

  const clicks = clickStream(document);
  const filteredClicks = filter(clicks, e => e.clientX > 100);

  for await (const click of filteredClicks) {
    console.log('Filtered click:', click.clientX);
  }
})();
