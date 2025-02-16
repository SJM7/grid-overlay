const defaultSettings = {
  enabled: false,
  columns: 4,
  rows: 4,
  gap: 16,
  opacity: 0.3,
  color: '#2196F3',
  xOffset: 0,
  yOffset: 0
};


const elements = {
  gridEnabled: document.getElementById('gridEnabled'),
  columns: document.getElementById('columns'),
  rows: document.getElementById('rows'),
  gap: document.getElementById('gap'),
  opacity: document.getElementById('opacity'),
  color: document.getElementById('color'),
  reset: document.getElementById('reset'),
  colValue: document.getElementById('colValue'),
  rowValue: document.getElementById('rowValue'),
  gapValue: document.getElementById('gapValue'),
  opacityValue: document.getElementById('opacityValue'),
  columnsInput: document.getElementById('columnsInput'),
  rowsInput: document.getElementById('rowsInput'),
  xOffset: document.getElementById('xOffset'),
  yOffset: document.getElementById('yOffset'),
  xOffsetInput: document.getElementById('xOffsetInput'),
  yOffsetInput: document.getElementById('yOffsetInput'),
  xOffsetValue: document.getElementById('xOffsetValue'),
  yOffsetValue: document.getElementById('yOffsetValue')
};


function saveSettings() {
  const settings = {
      enabled: elements.gridEnabled.checked,
      columns: parseInt(elements.columns.value),
      rows: parseInt(elements.rows.value),
      gap: parseInt(elements.gap.value),
      opacity: parseFloat(elements.opacity.value) / 100,
      color: elements.color.value,
      xOffset: parseInt(elements.xOffset.value),
      yOffset: parseInt(elements.yOffset.value)
  };

  chrome.storage.local.set({ gridSettings: settings });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'updateGrid',
              settings: settings
          });
      }
  });
}


function updateUI(settings) {
  elements.gridEnabled.checked = settings.enabled;
  elements.columns.value = settings.columns;
  elements.columnsInput.value = settings.columns;
  elements.rows.value = settings.rows;
  elements.rowsInput.value = settings.rows;
  elements.gap.value = settings.gap;
  elements.opacity.value = settings.opacity * 100;
  elements.color.value = settings.color;
  elements.xOffset.value = settings.xOffset;
  elements.xOffsetInput.value = settings.xOffset;
  elements.yOffset.value = settings.yOffset;
  elements.yOffsetInput.value = settings.yOffset;
  
  elements.colValue.textContent = settings.columns;
  elements.rowValue.textContent = settings.rows;
  elements.gapValue.textContent = settings.gap;
  elements.opacityValue.textContent = settings.opacity;
  elements.xOffsetValue.textContent = settings.xOffset;
  elements.yOffsetValue.textContent = settings.yOffset;
}


elements.gridEnabled.addEventListener('change', saveSettings);

elements.columns.addEventListener('input', (e) => {
  const value = e.target.value;
  elements.colValue.textContent = value;
  elements.columnsInput.value = value;
  saveSettings();
});

elements.columnsInput.addEventListener('input', (e) => {
  const value = Math.min(Math.max(e.target.value, 1), 50);
  elements.columns.value = value;
  elements.colValue.textContent = value;
  saveSettings();
});

elements.rows.addEventListener('input', (e) => {
  const value = e.target.value;
  elements.rowValue.textContent = value;
  elements.rowsInput.value = value;
  saveSettings();
});

elements.rowsInput.addEventListener('input', (e) => {
  const value = Math.min(Math.max(e.target.value, 1), 50);
  elements.rows.value = value;
  elements.rowValue.textContent = value;
  saveSettings();
});

elements.xOffset.addEventListener('input', (e) => {
  const value = e.target.value;
  elements.xOffsetValue.textContent = value;
  elements.xOffsetInput.value = value;
  saveSettings();
});

elements.xOffsetInput.addEventListener('input', (e) => {
  const value = Math.min(Math.max(e.target.value, -500), 500);
  elements.xOffset.value = value;
  elements.xOffsetValue.textContent = value;
  saveSettings();
});

elements.yOffset.addEventListener('input', (e) => {
  const value = e.target.value;
  elements.yOffsetValue.textContent = value;
  elements.yOffsetInput.value = value;
  saveSettings();
});

elements.yOffsetInput.addEventListener('input', (e) => {
  const value = Math.min(Math.max(e.target.value, -500), 500);
  elements.yOffset.value = value;
  elements.yOffsetValue.textContent = value;
  saveSettings();
});

elements.gap.addEventListener('input', (e) => {
  elements.gapValue.textContent = e.target.value;
  saveSettings();
});

elements.opacity.addEventListener('input', (e) => {
  elements.opacityValue.textContent = (e.target.value / 100).toFixed(2);
  saveSettings();
});

elements.color.addEventListener('input', saveSettings);

elements.reset.addEventListener('click', () => {
  updateUI(defaultSettings);
  saveSettings();
});


chrome.storage.local.get(['gridSettings'], (result) => {
  const settings = result.gridSettings || defaultSettings;
  updateUI(settings);
});