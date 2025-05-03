document.addEventListener('DOMContentLoaded', function() {
  const DEFAULT_COLOR = "#00B06F";
  
  // Get UI elements
  const colorPicker = document.getElementById('buttonColor');
  const colorValue = document.getElementById('colorValue');
  const saveButton = document.getElementById('saveSettings');
  const resetButton = document.getElementById('resetSettings');
  const statusText = document.getElementById('status');
  
  // Get toggle elements
  const ogGamesToggle = document.getElementById('ogGames');
  const ogGroupsToggle = document.getElementById('ogGroups');
  const ogCatalogToggle = document.getElementById('ogCatalog');
  
  // Load saved settings
  function loadSettings() {
    chrome.storage.sync.get(['buttonColor', 'ogGames', 'ogGroups', 'ogCatalog'], function(data) {
      // Load button color
      if (data.buttonColor) {
        colorPicker.value = data.buttonColor;
        colorValue.textContent = data.buttonColor;
      }
      
      // Load toggle states with defaults if not set
      ogGamesToggle.checked = data.ogGames !== undefined ? data.ogGames : true;
      ogGroupsToggle.checked = data.ogGroups !== undefined ? data.ogGroups : true;
      ogCatalogToggle.checked = data.ogCatalog !== undefined ? data.ogCatalog : true;
    });
  }
  
  // Update color value display when picker changes
  colorPicker.addEventListener('input', function() {
    colorValue.textContent = colorPicker.value;
  });
  
  // Reset all settings to defaults
  resetButton.addEventListener('click', function() {
    // Reset color
    colorPicker.value = DEFAULT_COLOR;
    colorValue.textContent = DEFAULT_COLOR;
    
    // Reset toggles
    ogGamesToggle.checked = true;
    ogGroupsToggle.checked = true;
    ogCatalogToggle.checked = true;
    
    showStatus("Settings reset to defaults");
  });
  
  // Save settings
  saveButton.addEventListener('click', function() {
    const settings = {
      buttonColor: colorPicker.value,
      ogGames: ogGamesToggle.checked,
      ogGroups: ogGroupsToggle.checked,
      ogCatalog: ogCatalogToggle.checked
    };
    
    chrome.storage.sync.set(settings, function() {
      showStatus("Settings saved successfully!");
      
      // Send message to content script to update in real-time
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateSettings',
            settings: settings
          });
        }
      });
    });
  });
  
  // Helper function to show status message
  function showStatus(message) {
    statusText.textContent = message;
    statusText.classList.add('visible');
    
    setTimeout(function() {
      statusText.classList.remove('visible');
    }, 2000);
  }
  
  // Initialize
  loadSettings();
}); 