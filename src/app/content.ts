import { COPY_TITLE_CMD } from '../constants/commands';

console.debug('Content script injected');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) {
    return true;
  }

  if (request.cmd === COPY_TITLE_CMD) {
    const taskNameEl = document.querySelector('.SingleTaskTitleInput-taskName textarea');

    if (taskNameEl) {
      return sendResponse({ title: taskNameEl.innerHTML });
    }

    return sendResponse({ error: 'Can\'t detect a task' });
  }

  return true;
});
