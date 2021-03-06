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
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  if (features[feature] === false) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);
    features[feature] = true;
    highlightFeature(target);

    // TODO: More code
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    features[feature] = false;
    unhighlightFeature(target);

    // TODO: More code
  }
  toggleFeatureInPreview(features[feature], feature);
  toggleSelectedFeature(features[feature], feature);
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

function toggleSelectedFeature(chosen, feature) {
  const parent = document.querySelector("div#selected ul");
  let featureLi;
  if (chosen === true) {
    featureLi = createFeatureElement(feature);
    parent.appendChild(featureLi);
    animateFeatureToList(chosen, feature, featureLi);
  } else {
    featureLi = document.querySelector(`div#selected ul li[data-feature=${feature}]`);
    animateFeatureToList(chosen, feature, featureLi, parent);
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

function animateFeatureToList(chosen, feature, featureLi, parent) {
  const firstFrame = document.querySelector(`div#options [data-feature=${feature}] img`).getBoundingClientRect();
  const lastFrame = featureLi.getBoundingClientRect();

  console.log("firstFrame ", firstFrame);
  console.log("lastFrame ", lastFrame);

  const deltaX = firstFrame.left - lastFrame.left;
  console.log(deltaX);
  const deltaY = firstFrame.top - lastFrame.top;
  console.log(deltaY);
  const deltaW = firstFrame.width / lastFrame.width;
  const deltaH = firstFrame.height / lastFrame.height;
  const animation = featureLi.animate(
    [
      {
        transformOrigin: "top left",
        transform: `translateX(${deltaX}px) 
      translateY(${deltaY}px) 
      scaleX(${deltaW}) 
      scaleY(${deltaH})`,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 300,
      easing: "ease-in-out",
    }
  );
  if (chosen === false) {
    animation.reverse();
    animation.onfinish = removeLi;
    function removeLi() {
      parent.removeChild(featureLi);
    }
  }
}
