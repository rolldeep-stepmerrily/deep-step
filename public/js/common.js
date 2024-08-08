function showElement(elementId) {
  document.querySelector(`#${elementId}`).classList.remove('hidden');
}

function hideElement(elementId) {
  document.querySelector(`#${elementId}`).classList.add('hidden');
}
