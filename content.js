const EXACT_SELECTOR = "#header > div > ul.nav.rbx-navbar.hidden-md.hidden-lg.col-xs-12 > li:nth-child(1) > a.font-header-2.nav-menu-title.text-header.charts-rename-exp-treatment.btr-nav-node-header_charts_rename";
const REPLACEMENT_HTML = '<a class="font-header-2 nav-menu-title text-header charts-rename-exp-treatment" href="/charts">Games</a>';
const CHARTS_HEADING_SELECTOR = "#games-carousel-page > div > div > div.games-list-header > h1";
const COMMUNITIES_SELECTOR = "#nav-group > span";
const MORE_COMMUNITIES_SELECTOR = "#group-container > div > div > div.container-header.see-all-container-header.ng-scope > a";
const COMMUNITIES_HEADING_SELECTOR = "#group-container > div > div > div.container-header.see-all-container-header.ng-scope > h1";
const SEARCH_COMMUNITIES_SELECTOR = "#group-container > div > div > groups-list > div.menu-vertical-container > div.input-group.group-search-input > input";
const MY_COMMUNITIES_SELECTOR = "#group-search-web-app > div > div.container-header.see-all-container-header > div > a";
const SEARCH_COMMUNITIES_HEADING_SELECTOR = "#group-search-web-app > div > div.container-header.see-all-container-header > h1";
const FRIENDS_COMMUNITIES_SELECTOR = "#group-search-web-app > div > group-landing > friends-groups > div.container-header > h2";
const TRENDING_EVENTS_HEADING_SELECTOR = "#games-carousel-page > div > h1";
const TRENDING_EVENTS_SUBHEADING_SELECTOR = "#games-carousel-page > div > div > div:nth-child(7) > div.game-sort-header-container > div > h2 > a";
const TRENDING_MUSIC_SUBHEADING_SELECTOR = "#games-carousel-page > div > div > div:nth-child(13) > div.game-sort-header-container > div.container-header.games-filter-changer > h2 > a";
const MARKETPLACE_NAV_SELECTOR = "#header > div > ul.nav.rbx-navbar.hidden-xs.hidden-sm.col-md-5.col-lg-4 > li:nth-child(2) > a";
const MARKETPLACE_HEADER_SELECTOR = "#catalog-content > div.catalog-header > div.search-bars.search-bar-placement-right > div.heading-container > h1 > a";
const SHOPPING_CART_CHECKOUT_BUTTON = "#search-bar > div > div.buy-btns-container > div.shopping-cart-btn-container > div > div > div.shopping-cart-footer > button";
const SHOPPING_CART_BUTTON = "#search-bar > div > div.buy-btns-container > a";
const SHOPPING_CART_ICON_BUTTON = "#search-bar > div > div.buy-btns-container > div.shopping-cart-btn-container > button";
const PLAY_BUTTON_SELECTOR = "#game-details-play-button-container > button";
const RANDOM_SERVER_BUTTON_SELECTOR = "#game-details-play-button-container > button.btn-full-width.btn-common-play-game-lg.btn-primary-md.btn-min-width.random-server-button";
const PLAY_SPECIFIC_GAME_SELECTOR = "#play-8425637426";
const FEATURED_GAME_PLAY_SELECTOR_1 = "#\\37 441031935 > div > a > div.featured-game-icon-container.ropro-card-quick-play > div > a:nth-child(1) > button";
const FEATURED_GAME_PLAY_SELECTOR_2 = "#\\37 441031935 > div > a > div.featured-game-icon-container.ropro-card-quick-play > div > a:nth-child(2) > button";
const JOIN_GAME_BUTTON_SELECTOR = "#join-game-button";
const DEFAULT_BUTTON_COLOR = "#00B06F";
let BUTTON_COLOR = DEFAULT_BUTTON_COLOR;

function loadButtonColor() {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get('buttonColor', function(data) {
        if (data.buttonColor) {
          BUTTON_COLOR = data.buttonColor;
          console.log(`Roblox++: Loaded custom button color: ${BUTTON_COLOR}`);
          applyCustomStyles();
        }
      });
    }
  } catch (e) {
    console.error('Roblox++: Error loading button color from storage', e);
    BUTTON_COLOR = DEFAULT_BUTTON_COLOR;
  }
}

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'updateButtonColor') {
      BUTTON_COLOR = message.color;
      console.log(`Roblox++: Updated button color to ${BUTTON_COLOR}`);
      applyCustomStyles();
      sendResponse({success: true});
    }
    return true;
  });
}

function updatePageTitle() {
  let success = false;
  
  if (document.title.includes("Charts - Roblox")) {
    document.title = document.title.replace("Charts - Roblox", "Games - Roblox");
    console.log("Roblox++: Updated page title from 'Charts - Roblox' to 'Games - Roblox'");
    success = true;
  }
  
  if (document.title.includes("Communities - Roblox")) {
    document.title = document.title.replace("Communities - Roblox", "Groups - Roblox");
    console.log("Roblox++: Updated page title from 'Communities - Roblox' to 'Groups - Roblox'");
    success = true;
  }
  
  if (document.title.includes("Marketplace - Roblox")) {
    document.title = document.title.replace("Marketplace - Roblox", "Catalog - Roblox");
    console.log("Roblox++: Updated page title from 'Marketplace - Roblox' to 'Catalog - Roblox'");
    success = true;
  }
  
  return success;
}

function changeButtonColor(selector) {
  const button = document.querySelector(selector);
  if (button) {
    button.style.backgroundColor = BUTTON_COLOR;
    button.style.borderColor = BUTTON_COLOR;
    return true;
  }
  return false;
}

function findAndColorJoinButtons() {
  let success = false;
  const specificButtons = [
    PLAY_BUTTON_SELECTOR,
    RANDOM_SERVER_BUTTON_SELECTOR,
    PLAY_SPECIFIC_GAME_SELECTOR,
    FEATURED_GAME_PLAY_SELECTOR_1,
    FEATURED_GAME_PLAY_SELECTOR_2,
    JOIN_GAME_BUTTON_SELECTOR,
    SHOPPING_CART_CHECKOUT_BUTTON,
    SHOPPING_CART_BUTTON
  ];
  
  for (let i = 0; i < specificButtons.length; i++) {
    if (changeButtonColor(specificButtons[i])) {
      success = true;
    }
  }
  
  try {
    const friendListJoinButtons = document.querySelectorAll('.friend-carousel-container button.btn-growth-sm.btn-full-width');
    if (friendListJoinButtons.length > 0) {
      for (let i = 0; i < friendListJoinButtons.length; i++) {
        if (friendListJoinButtons[i].textContent.includes('Join')) {
          friendListJoinButtons[i].style.backgroundColor = BUTTON_COLOR;
          friendListJoinButtons[i].style.borderColor = BUTTON_COLOR;
        }
      }
      success = true;
    }
    
    const standardPlayButtons = document.querySelectorAll('.btn-full-width.btn-common-play-game-lg.btn-primary-md.btn-min-width');
    if (standardPlayButtons.length > 0) {
      for (let i = 0; i < standardPlayButtons.length; i++) {
        standardPlayButtons[i].style.backgroundColor = BUTTON_COLOR;
        standardPlayButtons[i].style.borderColor = BUTTON_COLOR;
      }
      success = true;
    }
    
    const serverJoinButtons = document.querySelectorAll('button.rbx-game-server-join');
    if (serverJoinButtons.length > 0) {
      for (let i = 0; i < serverJoinButtons.length; i++) {
        serverJoinButtons[i].style.backgroundColor = BUTTON_COLOR;
        serverJoinButtons[i].style.borderColor = BUTTON_COLOR;
      }
      success = true;
    }
    
    const roProJoinButtons = document.querySelectorAll('.roproquickjoin, .ropro-quick-play button, .ropro-card-quick-play button');
    if (roProJoinButtons.length > 0) {
      for (let i = 0; i < roProJoinButtons.length; i++) {
        roProJoinButtons[i].style.backgroundColor = BUTTON_COLOR;
        roProJoinButtons[i].style.borderColor = BUTTON_COLOR;
      }
      success = true;
    }
    
    const roProRandomButtons = document.querySelectorAll('.roprorandomserver button, button.roprorandomserver');
    if (roProRandomButtons.length > 0) {
      for (let i = 0; i < roProRandomButtons.length; i++) {
        roProRandomButtons[i].style.backgroundColor = BUTTON_COLOR;
        roProRandomButtons[i].style.borderColor = BUTTON_COLOR;
      }
      success = true;
    }
    
    const pinnedGameButtons = document.querySelectorAll('.pin-button button, .pinned-game button, .pinned-game-card button');
    if (pinnedGameButtons.length > 0) {
      for (let i = 0; i < pinnedGameButtons.length; i++) {
        const btn = pinnedGameButtons[i];
        if (btn.textContent.includes('Join') || btn.textContent.includes('Play')) {
          btn.style.backgroundColor = BUTTON_COLOR;
          btn.style.borderColor = BUTTON_COLOR;
        }
      }
      success = true;
    }
    
    const shoppingCartButtons = document.querySelectorAll('.shopping-cart-btn-container button, .buy-btns-container a.btn-primary-md');
    if (shoppingCartButtons.length > 0) {
      for (let i = 0; i < shoppingCartButtons.length; i++) {
        if (!shoppingCartButtons[i].matches(SHOPPING_CART_ICON_BUTTON)) {
          shoppingCartButtons[i].style.backgroundColor = BUTTON_COLOR;
          shoppingCartButtons[i].style.borderColor = BUTTON_COLOR;
        }
      }
      success = true;
    }
    
    const otherButtons = document.querySelectorAll('button.btn-primary-md, button.btn-growth-md');
    if (otherButtons.length > 0) {
      for (let i = 0; i < otherButtons.length; i++) {
        const btn = otherButtons[i];
        if ((btn.textContent.includes('Join') || btn.textContent.includes('Play') || 
             btn.textContent.includes('Checkout') || btn.textContent.includes('Buy') ||
             btn.matches(SHOPPING_CART_BUTTON)) && 
            !btn.closest('.avatar-card') && 
            !btn.classList.contains('profile-selector') && 
            !btn.matches(SHOPPING_CART_ICON_BUTTON)) { 
          btn.style.backgroundColor = BUTTON_COLOR;
          btn.style.borderColor = BUTTON_COLOR;
        }
      }
    }
  } catch (e) {
    console.error('Roblox++: Error finding join buttons', e);
  }
  
  return success;
}

function changeMarketplaceToCatalog() {
  let success = false;
  
  const marketplaceNavElement = document.querySelector(MARKETPLACE_NAV_SELECTOR);
  if (marketplaceNavElement && marketplaceNavElement.textContent.trim() === "Marketplace") {
    marketplaceNavElement.textContent = "Catalog";
    success = true;
  }
  
  const marketplaceHeaderElement = document.querySelector(MARKETPLACE_HEADER_SELECTOR);
  if (marketplaceHeaderElement && marketplaceHeaderElement.textContent.trim() === "Marketplace") {
    marketplaceHeaderElement.textContent = "Catalog";
    success = true;
  }
  
  return success;
}

function applyCustomStyles() {
  return findAndColorJoinButtons();
}

function changeCommunityToGroups() {
  let success = false;
  
  const communitiesElement = document.querySelector(COMMUNITIES_SELECTOR);
  if (communitiesElement && communitiesElement.textContent.trim() === "Communities") {
    communitiesElement.textContent = "Groups";
    success = true;
  }
  
  const moreCommunitiesElement = document.querySelector(MORE_COMMUNITIES_SELECTOR);
  if (moreCommunitiesElement && moreCommunitiesElement.textContent.trim() === "More Communities") {
    moreCommunitiesElement.textContent = "More Groups";
    success = true;
  }
  
  const communitiesHeadingElement = document.querySelector(COMMUNITIES_HEADING_SELECTOR);
  if (communitiesHeadingElement && communitiesHeadingElement.textContent.trim() === "Communities") {
    communitiesHeadingElement.textContent = "Groups";
    success = true;
  }
  
  const searchCommunitiesElement = document.querySelector(SEARCH_COMMUNITIES_SELECTOR);
  if (searchCommunitiesElement && searchCommunitiesElement.getAttribute("placeholder") && 
      searchCommunitiesElement.getAttribute("placeholder").includes("Search My Communities")) {
    searchCommunitiesElement.setAttribute("placeholder", "Search My Groups");
    success = true;
  }
  
  const myCommunitiesElement = document.querySelector(MY_COMMUNITIES_SELECTOR);
  if (myCommunitiesElement && myCommunitiesElement.textContent.trim() === "My Communities") {
    myCommunitiesElement.textContent = "My Groups";
    success = true;
  }
  
  const searchCommunitiesHeadingElement = document.querySelector(SEARCH_COMMUNITIES_HEADING_SELECTOR);
  if (searchCommunitiesHeadingElement) {
    if (searchCommunitiesHeadingElement.textContent.trim() === "Search Communities") {
      searchCommunitiesHeadingElement.textContent = "Search Groups";
      success = true;
    } else if (searchCommunitiesHeadingElement.textContent.includes("Community Results For")) {
      searchCommunitiesHeadingElement.textContent = searchCommunitiesHeadingElement.textContent.replace("Community Results For", "Group Results For");
      success = true;
    }
  }
  
  const friendsCommunitiesElement = document.querySelector(FRIENDS_COMMUNITIES_SELECTOR);
  if (friendsCommunitiesElement && friendsCommunitiesElement.textContent.trim() === "Friends' Communities") {
    friendsCommunitiesElement.textContent = "Friends' Groups";
    success = true;
  }
  
  const trendingEventsHeading = document.querySelector(TRENDING_EVENTS_HEADING_SELECTOR);
  if (trendingEventsHeading) {
    if (trendingEventsHeading.textContent.includes("Trending Events in Experiences")) {
      trendingEventsHeading.textContent = trendingEventsHeading.textContent.replace("Trending Events in Experiences", "Trending Events in Games");
      success = true;
    } else if (trendingEventsHeading.textContent.includes("Trending Music Experiences")) {
      trendingEventsHeading.textContent = trendingEventsHeading.textContent.replace("Trending Music Experiences", "Trending Music Games");
      success = true;
    }
  }
  
  const trendingEventsSubheading = document.querySelector(TRENDING_EVENTS_SUBHEADING_SELECTOR);
  if (trendingEventsSubheading && trendingEventsSubheading.textContent.includes("Trending Events in Experiences")) {
    trendingEventsSubheading.textContent = trendingEventsSubheading.textContent.replace("Trending Events in Experiences", "Trending Events in Games");
    success = true;
  }
  
  const trendingMusicSubheading = document.querySelector(TRENDING_MUSIC_SUBHEADING_SELECTOR);
  if (trendingMusicSubheading && trendingMusicSubheading.textContent.includes("Trending Music Experiences")) {
    trendingMusicSubheading.textContent = trendingMusicSubheading.textContent.replace("Trending Music Experiences", "Trending Music Games");
    success = true;
  }
  
  return success;
}

function findAndReplaceChartsLinks() {
  const allLinks = document.querySelectorAll('a');
  let chartsLinksFound = 0;
  let replacedLinks = 0;
  
  for (let i = 0; i < allLinks.length; i++) {
    const link = allLinks[i];
    if (link.textContent.trim() === "Charts") {
      chartsLinksFound++;
      
      try {
        const temp = document.createElement('div');
        temp.innerHTML = REPLACEMENT_HTML;
        
        const newLink = temp.firstChild;
        
        const classes = link.classList;
        for (let j = 0; j < classes.length; j++) {
          if (!newLink.classList.contains(classes[j])) {
            newLink.classList.add(classes[j]);
          }
        }
        
        const attributes = link.attributes;
        for (let j = 0; j < attributes.length; j++) {
          const attr = attributes[j];
          if (attr.name !== 'href' && attr.name !== 'class') {
            newLink.setAttribute(attr.name, attr.value);
          }
        }
        
        link.parentNode.replaceChild(newLink, link);
        replacedLinks++;
      } catch (e) {
        console.log(`Roblox++: Error replacing Charts link #${chartsLinksFound}`, e);
      }
    }
  }
  
  try {
    const chartsHeading = document.querySelector(CHARTS_HEADING_SELECTOR);
    if (chartsHeading && chartsHeading.textContent.trim() === "Charts") {
      chartsHeading.textContent = "Games";
      replacedLinks++;
    }
  } catch (e) {
    console.log("Roblox++: Error replacing Charts heading", e);
  }
  
  return replacedLinks > 0;
}

function resetShoppingCartIconColor() {
  let success = false;
  
  const shoppingCartIcon = document.querySelector(SHOPPING_CART_BUTTON);
  if (shoppingCartIcon) {
    shoppingCartIcon.style.backgroundColor = BUTTON_COLOR;
    shoppingCartIcon.style.borderColor = BUTTON_COLOR;
    success = true;
  }
  
  const shoppingCartIconButton = document.querySelector(SHOPPING_CART_ICON_BUTTON);
  if (shoppingCartIconButton) {
    shoppingCartIconButton.style.backgroundColor = '';
    shoppingCartIconButton.style.borderColor = '';
    success = true;
  }
  
  return success;
}

function applyAllChanges() {
  loadButtonColor();
  updatePageTitle();
  findAndReplaceChartsLinks();
  changeCommunityToGroups();
  changeMarketplaceToCatalog();
  applyCustomStyles();
  resetShoppingCartIconColor();
  
  setupObservers();
}

function setupObservers() {
  const mainObserver = new MutationObserver(() => {
    updatePageTitle();
    findAndReplaceChartsLinks();
    changeCommunityToGroups();
    changeMarketplaceToCatalog();
    applyCustomStyles();
    resetShoppingCartIconColor();
  });

  if (document.body) {
    mainObserver.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      characterData: true
    });
  }
  
  const titleObserver = new MutationObserver(() => {
    updatePageTitle();
  });
  
  if (document.head) {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleObserver.observe(titleElement, { childList: true, characterData: true, subtree: true });
    } else {
      titleObserver.observe(document.head, { childList: true, subtree: true });
    }
  }
}

(function() {
  applyAllChanges();
  
  if (document.head) {
    updatePageTitle();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllChanges, { once: true });
  }
  
  window.addEventListener('load', applyAllChanges, { once: true });
  
  let checkCount = 0;
  const maxChecks = 20; 
  const rapidCheck = setInterval(() => {
    applyAllChanges();
    checkCount++;
    if (checkCount >= maxChecks) {
      clearInterval(rapidCheck);
    }
  }, 50);
})(); 