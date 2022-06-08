import { createElement } from '../../helpers/domHelper';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  const title = `${fighter.name} wins!`;
  const bodyElement = createElement('h1', 'modal-title');
  bodyElement.innerText = 'Congratulations!!';
  const onClose = () => window.location.reload();
  showModal({ title, bodyElement, onClose });
}
