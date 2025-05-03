document.addEventListener('DOMContentLoaded', function() {
  const DEFAULT_COLOR = "#00B06F";
  
  const colorPicker = document.getElementById('buttonColor');
  const colorValue = document.getElementById('colorValue');
  const resetButton = document.getElementById('resetColor');
  const saveButton = document.getElementById('saveSettings');
  const statusText = document.getElementById('status');
  
  chrome.storage.sync.get('buttonColor', function(data) {
    if (data.buttonColor) {
      colorPicker.value = data.buttonColor;
      colorValue.textContent = data.buttonColor;
    }
  });
  
  colorPicker.addEventListener('input', function() {
    colorValue.textContent = colorPicker.value;
  });
  
  resetButton.addEventListener('click', function() {
    colorPicker.value = DEFAULT_COLOR;
    colorValue.textContent = DEFAULT_COLOR;
  });
  
  saveButton.addEventListener('click', function() {
    const selectedColor = colorPicker.value;
    
    chrome.storage.sync.set({ buttonColor: selectedColor }, function() {
      statusText.style.visibility = 'visible';
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateButtonColor',
            color: selectedColor
          });
        }
      });
      
      setTimeout(function() {
        statusText.style.visibility = 'hidden';
      }, 2000);
    });
  });
}); 