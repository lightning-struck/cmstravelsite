export function renderBlocksToText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (block.children) {
        return block.children
          .map(child => child.text || '')
          .join('');
      }
      return '';
    })
    .join('\n')
    .trim();
}

export function renderBlocksToHTML(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (!block.children) return '';
      
      const content = block.children
        .map(child => {
          let text = child.text || '';
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.underline) text = `<u>${text}</u>`;
          return text;
        })
        .join('');
      
      switch (block.type) {
        case 'heading':
          return `<h${block.level || 2}>${content}</h${block.level || 2}>`;
        case 'quote':
          return `<blockquote>${content}</blockquote>`;
        case 'code':
          return `<pre><code>${content}</code></pre>`;
        default:
          return content ? `<p>${content}</p>` : '<br/>';
      }
    })
    .join('\n');
}