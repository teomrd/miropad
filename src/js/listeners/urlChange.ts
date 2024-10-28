import 'github-markdown-css';
import '../../css/print.css';
import '../../css/styles.css';
import notify from '../components/molecules/notify.ts';
import {
  search,
  setNoteFromHash,
} from '../components/organisms/noteManager/noteManager.ts';
import select from '../utils/dom.js';
import { url } from '../utils/urlManager.js';
import { getGist } from '../utils/github/api.js';

const setNoteFromRawUrl = async (rawUrl) => {
  if (rawUrl) {
    const response = await fetch(rawUrl).then((response) => {
      if (response.ok) return response.text();
      throw new Error(
        `Remote note could not be retrieved! code: ${response.status}`,
      );
    });
    select('.terminal').setValue(response);
  }
};

const setNoteFromGist = async (gistId) => {
  if (gistId) {
    try {
      const gist = await getGist(gistId);
      const { files } = gist;
      const fileContents = Object.values(files);
      const [gistFile] = fileContents;

      // @ts-ignore
      const { content } = gistFile;
      select('.terminal').setValue(content);
    } catch (error) {
      notify.error('MiroPad note not found! 🤷‍♂️');
    }
  }
};

export const actOnURLStateChange = async (e = {}) => {
  try {
    const { oldURL, newURL } = e;
    const oldPageId = url.getPageId(oldURL);
    const newPageId = url.getPageId(newURL);
    const hasPageIdChanged = oldPageId !== newPageId;
    const { v: oldV } = url.getParamsObject(oldURL);
    const { v: newV } = url.getParamsObject(newURL);
    const hasPageVersionChanged = oldV !== newV;
    const shouldChangeNote = [hasPageIdChanged, hasPageVersionChanged].some(
      (r) => r,
    );
    if (shouldChangeNote) setNoteFromHash();

    const { gistId, raw } = url.getParamsObject(newURL);
    await setNoteFromGist(gistId);
    await setNoteFromRawUrl(raw);
  } catch (e) {
    notify.error(e.message);
  }

  const isANewNote = !url.getPageId();
  select('#note-info-button').show(!isANewNote);
  select('#new-note').disable(isANewNote);

  if (url.getSearchParam('md') === 'full') {
    select('.terminal').hide();
  } else {
    select('.terminal').show();
  }

  if (url.getSearchParam('zen') === 'true') {
    select('.header').hide();
  } else {
    select('.header').show();
  }

  select('.note-info').hide();

  const q = url.getSearchParam('q');
  const queryResult = search(q);
  if (queryResult) select('.terminal').setValue(queryResult.text);
};
