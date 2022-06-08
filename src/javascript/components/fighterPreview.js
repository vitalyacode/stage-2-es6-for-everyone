import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  const fighterImage = createFighterImage(fighter);
  fighterElement.appendChild(fighterImage);

  const fighterInfo = createElement({
    tagName: 'div',
    className: 'fighter-preview___stats'
  });

  fighterInfo.innerHTML = `
    <div>${fighter.name}</div>
    <div>HP: ${fighter.health}</div>
    <div>Defense: ${fighter.defense}</div>
    <div>Attack: ${fighter.attack}</div>
  `;
  // todo: show fighter info (image, name, health, etc.)

  fighterElement.appendChild(fighterInfo);
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
