"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"

  // If feature is (now) turned on:
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  if (features[feature] === false) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);
    features[feature] = true;
    highlightFeature(target);
    toggleFeatureInPreview(features[feature], feature);

    // TODO: More code
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    features[feature] = false;
    unhighlightFeature(target);
    toggleFeatureInPreview(features[feature], feature);

    // TODO: More code
  }
}

function highlightFeature(target) {
  target.classList.add("chosen");
}

function unhighlightFeature(target) {
  target.classList.remove("chosen");
}

function toggleFeatureInPreview(chosen, feature) {
  const featureElement = document.querySelector(`[data-feature=${feature}]`);
  if (chosen === true) {
    featureElement.classList.remove("hide");
  } else {
    featureElement.classList.add("hide");
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
