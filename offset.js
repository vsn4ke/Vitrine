/*
  Script used to offset the link clicked
*/

/**
  return {NUMBER} return the current size of the screen
*/
function getScreenSize(){
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

/**
  Check the href value and scrolled if is valid

  @Param {STRING} href    href attribute to be processed
  @Param {NUMBER} offset_height   value used to offset the page when the link is clicked
  return {BOOLEAN} return true if the link is valid and the page has scrolled to the link
*/
function scrollIfAnchor(href, offset_height = 150){
  let match, anchorOffset;

  if(!/^#[^ ]+$/.test(href)){  // Is href an anchor? (#anchor)
    return false;
  }

  match = document.getElementById(href.slice(1));

  if(match) {
    anchorOffset = window.pageYOffset + match.getBoundingClientRect().top - offset_height;
    window.scrollTo(window.pageXOffset, anchorOffset);
  }
  return !!match;
}

window.addEventListener('DOMContentLoaded', (e) =>{
  scrollIfAnchor(window.location.hash) // scroll if an anchor is provided in the URL

  document.body.addEventListener('click', (e) =>{
    let elem = e.target;
    if(elem.nodeName === 'A' && scrollIfAnchor(elem.getAttribute('href'))) {
      e.preventDefault();
    }
  })
})