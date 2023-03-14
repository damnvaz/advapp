export function setProgressBar(numberOfSteps) {
  let bars = "";
  for (let i = 0; i < numberOfSteps; i++) {
    if (i != numberOfSteps - 1) {
      bars += `
            <li class="progress-bar__dot ${i === 0 ? "full" : ""}"></li>
            <li class="progress-bar__connector"></li>
        `;
    }

    if (i > 0 && i === numberOfSteps - 1) {
      bars += `<li class="progress-bar__dot"></li>`;
    }
  }

  return `
    <ul class="progress-bar">
      ${bars}
    </ul>
  `;
}

export function setStepperButtonGroup(next, previous, steps, current) {
  return `
    <div class="stepper-button-group">
      <button id="previous" class="stepper-button-back disabled" 
        ${current === 1 ? "disabled" : ""}>
        ${previous}
      </button>
      <button id="next" class="stepper-button-next"
        ${current === steps ? "disabled" : ""}>
        ${next}
      </button>
    </div>
  `;
}

export function Stepper(current, steps, form, previous, next) {
  return `
    <div class="form-area">
      ${setProgressBar(steps)}
      ${form}
      ${setStepperButtonGroup(next, previous, steps, current)}
    </div>
  `;
}

export function goToStep(currentStep, steps) {
  let indicators = document.getElementsByClassName("progress-bar__dot");
  const previousButton = document.querySelector("#previous");
  const next = document.querySelector("#next");

  handleButtons(currentStep, previousButton, next, steps);
  handleIndicators(indicators, currentStep);
}

function enable(elem) {
  elem.classList.remove("disabled");
  elem.disabled = false;
}

function disable(elem) {
  elem.classList.add("disabled");
  elem.disabled = true;
}

function handleIndicators(indicators, currentStep) {
  for (let i = indicators.length - 1; i >= currentStep; i--) {
    indicators[i].classList.remove("full");
  }

  for (let i = 0; i < currentStep; i++) {
    indicators[i].classList.add("full");
  }
}

function handleButtons(currentStep, previousButton, next, numberOfSteps) {
  if (currentStep === 1) {
    disable(previousButton);
    enable(next);
    next.innerHTML = "próximo";
    return;
  }

  if (currentStep > 1 && currentStep < numberOfSteps) {
    enable(previousButton);
    enable(next);
    next.innerHTML = "próximo";
    return;
  }

  if (currentStep > 1 && currentStep === numberOfSteps) {
    enable(previousButton);
    next.innerHTML = "finalizar";
    return;
  }
}
