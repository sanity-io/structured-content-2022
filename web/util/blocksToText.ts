const blocksToText = (blocks = []) =>
  blocks.map((block) =>
    block._type !== 'block' || !block.children
      ? ''
      : block.children.map((child) => child.text).join('')
  );

export default blocksToText;
