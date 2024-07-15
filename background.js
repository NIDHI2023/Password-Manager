//this is where anything to do with manipulating the extension UI is contained
//you cannot do any onClicked events when you have a popup

chrome.browserAction.setBadgeBackgroundColor({
	color: '#ff0000'
});
chrome.browserAction.setBadgeText({
	text: '1'
});