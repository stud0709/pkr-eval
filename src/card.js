
/** A visual card representation */
const Card = ({ value, suit, fold }) => {
  return (<>
    <table class={'card' + (fold ? ' fold' : '')}>
      <tbody>
        <tr><td class="card_suit_top">{suit || '?'}</td></tr>
        <tr><td class="card_value">{value || '?'}</td></tr>
        <tr><td class="card_suit_bottom">{suit || '?'}</td></tr>
      </tbody>
    </table>
  </>);
};

export default Card;