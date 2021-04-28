
/** A visual card representation */
const Card = ({ value, suit, fold, red }) => {
  return (<>
    <table className={'card' + (fold ? ' fold' : '') +(red ? ' red_suit' : '') }>
      <tbody>
        <tr><td className="card_suit_top">{suit || '?'}</td></tr>
        <tr><td className="card_value">{value || '?'}</td></tr>
        <tr><td className="card_suit_bottom">{suit || '?'}</td></tr>
      </tbody>
    </table>
  </>);
};

export default Card;