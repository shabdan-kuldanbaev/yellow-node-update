export default function downloadFile(fileUrl) {
  const anchor = document.createElement('a');

  anchor.href = fileUrl;
  anchor.download = true;
  anchor.target = '_blank';

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
}
